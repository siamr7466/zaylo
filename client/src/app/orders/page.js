"use client";
import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthContext from '../../context/AuthContext';
import styles from './UserOrders.module.css';
import { LuShoppingBag, LuCalendar, LuPackage } from 'react-icons/lu';

export default function MyOrdersPage() {
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/myorders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch orders');

                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (loading) return <div className={styles.loading}>Loading orders...</div>;

    if (error) return (
        <div className={styles.error}>
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()} className={styles.detailsBtn}>Try Again</button>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={`container`}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>My Orders</h1>
                    <p>Track and manage your recent purchases</p>
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        className={styles.empty}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <LuShoppingBag className={styles.emptyIcon} />
                        <h2>No orders found</h2>
                        <p>Looks like you haven't bought anything yet.</p>
                        <br />
                        <Link href="/shop" className={styles.detailsBtn}>Start Shopping</Link>
                    </motion.div>
                ) : (
                    <div className={styles.ordersGrid}>
                        {orders.map((order, index) => (
                            <motion.div
                                key={order._id}
                                className={styles.orderCard}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className={styles.orderInfo}>
                                    <h3>Order #{order._id.substring(0, 8)}...</h3>
                                    <p>{order.orderItems.length} items</p>
                                </div>
                                <div className={styles.orderDate}>
                                    <LuCalendar style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                                <div className={styles.orderTotal}>
                                    ${order.totalPrice.toFixed(2)}
                                </div>
                                <div className={`
                                    ${styles.statusBadge} 
                                    ${order.isDelivered ? styles.statusDelivered : styles.statusProcessing}
                                `}>
                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                </div>
                                <Link href={`/orders/${order._id}`} className={styles.detailsBtn}>
                                    View Details
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
