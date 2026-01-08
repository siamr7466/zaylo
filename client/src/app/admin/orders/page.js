"use client";
import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSearch, LuEye, LuCheckCircle, LuTruck, LuClock, LuX, LuUser, LuMapPin, LuCreditCard } from 'react-icons/lu';
import styles from './Orders.module.css';
import api from '../../../lib/api';
import AuthContext from '../../../context/AuthContext';

export default function AdminOrders() {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await api.get('/orders', config);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeliver = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await api.put(`/orders/${id}/deliver`, {}, config);
            fetchOrders();
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder({ ...selectedOrder, isDelivered: true });
            }
        } catch (error) {
            alert('Error updating order');
        }
    };

    const handlePaid = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await api.put(`/orders/${id}/pay`, {}, config);
            fetchOrders();
            if (selectedOrder && selectedOrder._id === id) {
                setSelectedOrder({ ...selectedOrder, isPaid: true });
            }
        } catch (error) {
            alert('Error updating order');
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' ||
            (statusFilter === 'Delivered' && order.isDelivered) ||
            (statusFilter === 'Pending' && !order.isDelivered);
        return matchesSearch && matchesStatus;
    });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleInfo}>
                    <h1>Order Management</h1>
                    <p>Track and manage customer deliveries</p>
                </div>
            </header>

            <div className={styles.tableControls}>
                <div className={styles.searchBox}>
                    <LuSearch />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <button
                        className={`${styles.filterBtn} ${statusFilter === 'All' ? styles.activeFilter : ''}`}
                        onClick={() => setStatusFilter('All')}
                    >All</button>
                    <button
                        className={`${styles.filterBtn} ${statusFilter === 'Pending' ? styles.activeFilter : ''}`}
                        onClick={() => setStatusFilter('Pending')}
                    >Pending</button>
                    <button
                        className={`${styles.filterBtn} ${statusFilter === 'Delivered' ? styles.activeFilter : ''}`}
                        onClick={() => setStatusFilter('Delivered')}
                    >Delivered</button>
                </div>
            </div>

            {loading ? (
                <div className={styles.loader}>Fetching orders...</div>
            ) : (
                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    <td className={styles.orderId}>#{order._id.substring(0, 8)}</td>
                                    <td>{order.user?.name || 'Customer'}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        <span className={`${styles.badge} ${order.isPaid ? styles.success : styles.error}`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${order.isDelivered ? styles.success : styles.warning}`}>
                                            {order.isDelivered ? 'Delivered' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className={styles.actions}>
                                        <button
                                            className={styles.viewBtn}
                                            onClick={() => setSelectedOrder(order)}
                                            title="View Details"
                                        >
                                            <LuEye />
                                        </button>
                                        {!order.isDelivered && (
                                            <button
                                                className={styles.deliverBtn}
                                                onClick={() => handleDeliver(order._id)}
                                                title="Mark Delivered"
                                            >
                                                <LuTruck />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className={styles.modalOverlay}>
                        <motion.div
                            className={styles.modal}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <div className={styles.modalHeader}>
                                <h2>Order Details <span>#{selectedOrder._id.substring(0, 12)}</span></h2>
                                <button className={styles.closeModal} onClick={() => setSelectedOrder(null)}>
                                    <LuX />
                                </button>
                            </div>

                            <div className={styles.orderBody}>
                                <div className={styles.orderGrid}>
                                    <div className={styles.orderSection}>
                                        <h3><LuUser /> Customer</h3>
                                        <p>{selectedOrder.user?.name}</p>
                                        <p>{selectedOrder.user?.email}</p>
                                    </div>
                                    <div className={styles.orderSection}>
                                        <h3><LuMapPin /> Shipping</h3>
                                        <p>{selectedOrder.shippingAddress.address}</p>
                                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                                        <p>{selectedOrder.shippingAddress.country}</p>
                                    </div>
                                    <div className={styles.orderSection}>
                                        <h3><LuCreditCard /> Payment</h3>
                                        <p>Method: {selectedOrder.paymentMethod}</p>
                                        <p className={selectedOrder.isPaid ? styles.textSuccess : styles.textError}>
                                            {selectedOrder.isPaid ? 'Paid' : 'Awaiting Payment'}
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.itemsList}>
                                    <h3>Order Items</h3>
                                    <div className={styles.items}>
                                        {selectedOrder.orderItems.map((item, idx) => (
                                            <div key={idx} className={styles.item}>
                                                <img src={item.image} alt="" />
                                                <div className={styles.itemInfo}>
                                                    <p>{item.name}</p>
                                                    <span>{item.qty} x ${item.price} = ${item.qty * item.price}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.orderSummary}>
                                    <div className={styles.summaryRow}>
                                        <span>Items Price</span>
                                        <span>${selectedOrder.itemsPrice}</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>Shipping</span>
                                        <span>${selectedOrder.shippingPrice}</span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>Tax</span>
                                        <span>${selectedOrder.taxPrice}</span>
                                    </div>
                                    <div className={`${styles.summaryRow} ${styles.total}`}>
                                        <span>Total</span>
                                        <span>${selectedOrder.totalPrice}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                {!selectedOrder.isPaid && (
                                    <button
                                        className={styles.mainDeliverBtn}
                                        onClick={() => handlePaid(selectedOrder._id)}
                                        style={{ background: '#4CAF50', marginRight: '10px' }}
                                    >
                                        Mark as Paid
                                    </button>
                                )}
                                {!selectedOrder.isDelivered && (
                                    <button
                                        className={styles.mainDeliverBtn}
                                        onClick={() => handleDeliver(selectedOrder._id)}
                                    >
                                        Mark as Delivered
                                    </button>
                                )}
                                <button className={styles.closeBtn} onClick={() => setSelectedOrder(null)}>Close</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
