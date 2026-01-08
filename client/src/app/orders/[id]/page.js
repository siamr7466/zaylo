"use client";
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import api from '../../../lib/api';
import AuthContext from '../../../context/AuthContext';
import styles from './page.module.css';

export default function OrderDetails() {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setOrder(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        if (user && id) fetchOrder();
    }, [id, user]);

    if (loading) return <div style={{ color: 'white', padding: '4rem', textAlign: 'center' }}>Loading Order...</div>;
    if (!order) return <div style={{ color: 'white', padding: '4rem', textAlign: 'center' }}>Order Not Found</div>;

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Order {order._id}</h1>

                <div className={styles.grid}>
                    <div className={styles.info}>
                        <div className={styles.section}>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong> {order.user.email}</p>
                            <p>
                                <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <div className={`${styles.alert} ${styles.success}`}>Delivered at {order.deliveredAt}</div>
                            ) : (
                                <div className={`${styles.alert} ${styles.danger}`}>Not Delivered</div>
                            )}
                        </div>

                        <div className={styles.section}>
                            <h2>Payment Method</h2>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <div className={`${styles.alert} ${styles.success}`}>Paid on {order.paidAt}</div>
                            ) : (
                                <div className={`${styles.alert} ${styles.danger}`}>Not Paid</div>
                            )}
                        </div>

                        <div className={styles.section}>
                            <h2>Order Items</h2>
                            <div className={styles.items}>
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className={styles.item}>
                                        <div className={styles.itemImage}>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className={styles.itemName}>
                                            {item.name} <span className={styles.qty}>x {item.qty}</span>
                                        </div>
                                        <div className={styles.itemPrice}>
                                            ${item.price * item.qty}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.summary}>
                        <h2>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Items</span>
                            <span>${order.itemsPrice}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>${order.shippingPrice}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Tax</span>
                            <span>${order.taxPrice}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total</span>
                            <span>${order.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
