"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    const [settings, setSettings] = useState(null);
    const [email, setEmail] = useState('');
    const [subStatus, setSubStatus] = useState('idle'); // idle, loading, success, error
    const [subMessage, setSubMessage] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`);
                const data = await res.json();
                if (data) setSettings(data);
            } catch (err) {
                console.error("Failed to fetch settings:", err);
            }
        };

        fetchSettings();
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setSubStatus('loading');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.ok) {
                setSubStatus('success');
                setSubMessage('Subscribed! Check your inbox.');
                setEmail('');
            } else {
                setSubStatus('error');
                setSubMessage(data.message || 'Subscription failed.');
            }
        } catch (error) {
            setSubStatus('error');
            setSubMessage('Something went wrong.');
        }
    };

    const socialLinks = settings?.socials || {};

    return (
        <motion.footer
            className={styles.footer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
        >
            <div className={`container ${styles.grid}`}>
                <motion.div
                    className={styles.brand}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className={styles.logo}>{settings?.siteName || 'ZAYLO'}</h2>
                    <p className={styles.desc}>{settings?.siteDescription || 'Elevating your lifestyle with premium modern fashion.'}</p>
                </motion.div>

                <motion.div
                    className={styles.links}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3>Shop</h3>
                    <ul>
                        <li><Link href="/shop?category=Perfumes">Perfumes</Link></li>
                        <li><Link href="/shop?category=Watches">Watches</Link></li>
                        <li><Link href="/shop?category=Gadgets">Gadgets</Link></li>
                    </ul>
                </motion.div>

                <motion.div
                    className={styles.links}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h3>Support</h3>
                    <ul>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/faq">FAQs</Link></li>
                        <li><Link href="/shipping">Shipping Policy</Link></li>
                    </ul>
                </motion.div>

                <motion.div
                    className={styles.newsletter}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3>Stay Updated</h3>
                    <form className={styles.form} onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn btn-primary" disabled={subStatus === 'loading'}>
                            {subStatus === 'loading' ? '...' : 'Subscribe'}
                        </button>
                    </form>
                    {subMessage && (
                        <p style={{
                            marginTop: '10px',
                            fontSize: '0.9rem',
                            color: subStatus === 'success' ? '#4CAF50' : '#ff4d4d'
                        }}>
                            {subMessage}
                        </p>
                    )}
                    <div className={styles.socialLinks}>
                        {socialLinks.facebook && (
                            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                        )}
                        {socialLinks.twitter && (
                            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
                                <FaTwitter />
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                                <FaInstagram />
                            </a>
                        )}
                        {socialLinks.linkedin && (
                            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        )}
                    </div>
                </motion.div>
            </div>
            <div className={`container ${styles.bottom}`}>
                <p>&copy; {new Date().getFullYear()} {settings?.siteName || 'Zaylo'}. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
