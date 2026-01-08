const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const generateInvoiceHtml = require('../utils/invoiceTemplate');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    console.log('Received Order Request Body:', req.body);

    if (!orderItems || orderItems.length === 0) {
        console.error('Order validation failed: No order items');
        res.status(400);
        throw new Error('No order items');
    } else {
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false,
        });

        const createdOrder = await order.save();

        // Send Email to User
        const userEmail = req.user.email;
        const message = `
            Thank you for your order!
            Order ID: ${createdOrder._id}
            Total: $${totalPrice}
            
            We have received your order and it is being processed.
            You can view your order status in your dashboard: ${process.env.FRONTEND_URL}/orders/${createdOrder._id}
        `;

        try {
            await sendEmail({
                email: userEmail,
                subject: `Invoice #${createdOrder._id.toString().substring(0, 8).toUpperCase()} - Your Order from Zaylo`,
                message,
                html: generateInvoiceHtml({ ...createdOrder._doc, user: req.user }) // Pass full order with user details
            });
        } catch (error) {
            console.error('Order confirmation email failed:', error);
        }

        // Send Email to Admin
        const adminEmail = process.env.CONTACT_EMAIL || 'admin@zaylo.com';
        try {
            await sendEmail({
                email: adminEmail,
                subject: 'New Order Received - Zaylo',
                message: `New Order ${createdOrder._id} from ${req.user.name}. Total: $${totalPrice}`,
                html: `
                    <h3>New Order Received</h3>
                    <p><strong>Order ID:</strong> ${createdOrder._id}</p>
                    <p><strong>Customer:</strong> ${req.user.name} (${userEmail})</p>
                    <p><strong>Total:</strong> $${totalPrice}</p>
                    <a href="${process.env.FRONTEND_URL}/admin/orders" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Manage Orders</a>
                `
            });
        } catch (error) {
            console.error('Admin order notification email failed:', error);
        }

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'email'); // Populate user to get email

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        if (order.user) {
            try {
                await sendEmail({
                    email: order.user.email,
                    subject: 'Order Delivered - Zaylo',
                    message: `Your order ${order._id} has been delivered. Enjoy!`,
                    html: `
                        <h3>Order Delivered!</h3>
                        <p>Your order <strong>${order._id}</strong> has been marked as delivered.</p>
                        <p>We hope you enjoy your purchase!</p>
                        <a href="${process.env.FRONTEND_URL}/orders/${order._id}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Order</a>
                    `
                });
            } catch (error) {
                console.error('Delivery notification email failed:', error);
            }
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'email');

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // Payment result populated by PayPal usually, but simple here

        const updatedOrder = await order.save();

        if (order.user) {
            try {
                await sendEmail({
                    email: order.user.email,
                    subject: 'Order Payment Confirmed - Zaylo',
                    message: `Payment for Order ${order._id} has been confirmed. We are processing it now.`,
                    html: `
                        <h3>Payment Confirmed</h3>
                        <p>We have confirmed payment for your order <strong>${order._id}</strong>.</p>
                        <p>We will notify you when it ships.</p>
                        <a href="${process.env.FRONTEND_URL}/orders/${order._id}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Order</a>
                    `
                });
            } catch (error) {
                console.error('Payment confirmation email failed:', error);
            }
        }

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get Admin Stats
// @route   GET /api/orders/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    // Need product count. better to import Product
    const Product = require('../models/Product');
    const productCount = await Product.countDocuments();

    const totalSales = orders.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    const totalOrders = orders.length;

    // Simple profit calc based on estimated cost since we don't have cost in OrderItems always
    const totalProfit = orders.reduce((acc, order) => {
        const orderProfit = order.orderItems.reduce((pAcc, item) => {
            // If cost is not saved in orderItem, assume 70% of price is cost
            const cost = item.cost || (item.price * 0.7);
            return pAcc + (item.price - cost) * (item.qty || 1);
        }, 0);
        return acc + orderProfit;
    }, 0);

    res.json({
        totalSales: Number(totalSales.toFixed(2)),
        totalOrders,
        totalProducts: productCount,
        totalProfit: Number(totalProfit.toFixed(2))
    });
});

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    getAdminStats
};
