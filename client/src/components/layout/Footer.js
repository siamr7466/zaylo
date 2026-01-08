import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
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
                    <h2 className={styles.logo}>ZAYLO</h2>
                    <p className={styles.desc}>Elevating your lifestyle with premium modern fashion.</p>
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
                    <form className={styles.form}>
                        <input type="email" placeholder="Your email address" className={styles.input} />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form>
                </motion.div>
            </div>
            <div className={`container ${styles.bottom}`}>
                <p>&copy; {new Date().getFullYear()} Zaylo. All rights reserved.</p>
            </div>
        </motion.footer>
    );
};

export default Footer;
