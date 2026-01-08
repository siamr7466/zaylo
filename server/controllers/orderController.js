const asyncHandler = require('express-async-handler');
const { ordersDb } = require('../config/jsonDb');

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

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = await ordersDb.create({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
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

        res.status(201).json(order);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await ordersDb.findById(req.params.id);

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
    const orders = await ordersDb.find({ user: req.user._id });
    res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await ordersDb.find({});
    res.json(orders);
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const updated = await ordersDb.findByIdAndUpdate(req.params.id, {
        isDelivered: true,
        deliveredAt: new Date().toISOString()
    });

    if (updated) {
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get Admin Stats
// @route   GET /api/orders/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
    const orders = await ordersDb.find({});
    const products = await (require('../config/jsonDb').productsDb.find({}));

    const totalSales = orders.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;

    // Simple profit calculation (assuming 30% margin if cost is missing, otherwise using actual cost)
    const totalProfit = orders.reduce((acc, order) => {
        const orderProfit = order.orderItems.reduce((pAcc, item) => {
            const cost = item.cost || (item.price * 0.7); // Fallback to 70% cost if not set
            return pAcc + (item.price - cost) * (item.qty || 1);
        }, 0);
        return acc + orderProfit;
    }, 0);

    res.json({
        totalSales: Number(totalSales.toFixed(2)),
        totalOrders,
        totalProducts,
        totalProfit: Number(totalProfit.toFixed(2))
    });
});

module.exports = {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    getAdminStats
};
