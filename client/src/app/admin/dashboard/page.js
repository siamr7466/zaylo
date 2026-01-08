"use client";
import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { LuTrendingUp, LuShoppingBag, LuPackage, LuUsers, LuDollarSign } from 'react-icons/lu';
import Link from 'next/link';
import styles from './Dashboard.module.css';
import api from '../../../lib/api';
import AuthContext from '../../../context/AuthContext';

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalProfit: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?.token) return; // Wait for token
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const statsRes = await api.get('/orders/stats', config);
                setStats(statsRes.data);

                const ordersRes = await api.get('/orders', config);
                setRecentOrders(Array.isArray(ordersRes.data) ? ordersRes.data.slice(0, 5) : []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchDashboardData();
    }, [user]);

    const statCards = [
        { title: 'Total Revenue', value: `$${stats.totalSales}`, icon: <LuDollarSign />, color: '#4CAF50', growth: '+12%' },
        { title: 'Total Orders', value: stats.totalOrders, icon: <LuShoppingBag />, color: '#2196F3', growth: '+5%' },
        { title: 'Total Products', value: stats.totalProducts, icon: <LuPackage />, color: '#FF9800', growth: '+2' },
        { title: 'Est. Profit', value: `$${stats.totalProfit}`, icon: <LuTrendingUp />, color: '#E91E63', growth: '+18%' },
    ];

    if (loading) return <div className={styles.loader}>Loading Analytics...</div>;

    return (
        <div className={styles.container}>
            <header className={styles.dashboardHeader}>
                <h1>Dashboard Overview</h1>
                <p>Monitor your shop's performance and sales metrics</p>
            </header>

            <div className={styles.statsGrid}>
                {statCards.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        className={styles.statCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className={styles.statInfo}>
                            <span className={styles.statTitle}>{stat.title}</span>
                            <h3 className={styles.statValue}>{stat.value}</h3>
                            <span className={styles.statGrowth}>{stat.growth} vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className={styles.sectionsGrid}>
                {/* Recent Orders Table */}
                <motion.div
                    className={styles.sectionCard}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className={styles.sectionHeader}>
                        <h3>Recent Orders</h3>
                        <Link href="/admin/orders">
                            <button className={styles.viewAllBtn}>View All Orders</button>
                        </Link>
                    </div>
                    <div className={styles.tableResponsive}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>#{order._id.substring(0, 8)}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>{order.orderItems.length} items</td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <span className={`${styles.badge} ${order.isDelivered ? styles.success : styles.warning}`}>
                                                {order.isDelivered ? 'Delivered' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className={styles.emptyTable}>No orders yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Quick Actions / Insights */}
                <motion.div
                    className={styles.sectionCard}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className={styles.sectionHeader}>
                        <h3>Quick Insights</h3>
                    </div>
                    <div className={styles.insightList}>
                        <div className={styles.insightItem}>
                            <div className={styles.insightDot} style={{ background: '#4CAF50' }}></div>
                            <div className={styles.insightContent}>
                                <strong>High Demand</strong>
                                <p>Perfumes are making up 45% of your total sales this week.</p>
                            </div>
                        </div>
                        <div className={styles.insightItem}>
                            <div className={styles.insightDot} style={{ background: '#FF9800' }}></div>
                            <div className={styles.insightContent}>
                                <strong>Inventory Alert</strong>
                                <p>2 products are currently running low on stock.</p>
                            </div>
                        </div>
                        <div className={styles.insightItem}>
                            <div className={styles.insightDot} style={{ background: '#2196F3' }}></div>
                            <div className={styles.insightContent}>
                                <strong>New Users</strong>
                                <p>You gained 12 new customers in the last 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
