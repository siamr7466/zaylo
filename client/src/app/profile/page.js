"use client";
import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import AuthContext from '../../context/AuthContext';
import styles from './Profile.module.css';
import { LuUser, LuMail, LuSettings, LuShoppingBag, LuLayoutDashboard } from 'react-icons/lu';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, updateProfile, loading } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (!user) return <div className={styles.loading}>Please login to view this page.</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setSuccess(false);

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            await updateProfile({ name, email, password });
            setSuccess(true);
            setMessage('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage(err);
        }
    };

    return (
        <div className={styles.profileContainer}>
            <div className={`container ${styles.content}`}>
                <div className={styles.grid}>
                    {/* Sidebar */}
                    <motion.div
                        className={styles.sidebar}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className={styles.userBrief}>
                            <div className={styles.avatar}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className={styles.userInfo}>
                                <h3>{user.name}</h3>
                                <p>{user.isAdmin ? 'Administrator' : 'Premium Member'}</p>
                            </div>
                        </div>

                        <nav className={styles.sideNav}>
                            <Link href="/profile" className={`${styles.navItem} ${styles.active}`}>
                                <LuUser /> Profile Settings
                            </Link>
                            <Link href="/orders" className={styles.navItem}>
                                <LuShoppingBag /> My Orders
                            </Link>
                            {user.isAdmin && (
                                <Link href="/admin/dashboard" className={styles.navItem}>
                                    <LuLayoutDashboard /> Admin Panel
                                </Link>
                            )}
                        </nav>
                    </motion.div>

                    {/* Main Content */}
                    <motion.div
                        className={styles.main}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h2><LuSettings /> Account Settings</h2>
                                <p>Update your personal information and password</p>
                            </div>

                            {message && (
                                <div className={`${styles.alert} ${success ? styles.alertSuccess : styles.alertError}`}>
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name</label>
                                    <div className={styles.inputWrapper}>
                                        <LuUser className={styles.inputIcon} />
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email Address</label>
                                    <div className={styles.inputWrapper}>
                                        <LuMail className={styles.inputIcon} />
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.divider}>
                                    <span>Change Password (Optional)</span>
                                </div>

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="password">New Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="confirmPassword">Confirm New Password</label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className={styles.submitBtn}>
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
