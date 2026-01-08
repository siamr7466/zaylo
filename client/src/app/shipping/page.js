"use client";
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHero from '../../components/ui/PageHero';
import styles from './Shipping.module.css';

export default function ShippingPage() {
    return (
        <main className={styles.shippingContainer}>
            <Navbar />
            <PageHero
                title="Shipping Policy"
                subtitle="Information about delivery times, costs, and international shipping."
                breadcrumbs={[{ label: 'Shipping Policy', href: '/shipping' }]}
            />

            <div className={`container ${styles.content}`}>
                <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={styles.section}>
                        <h2>Order Processing</h2>
                        <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>Shipping Rates & Delivery Estimates</h2>
                        <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                        <ul>
                            <li><strong>Standard Shipping (5-7 business days):</strong> Free for orders over $150, otherwise $9.95.</li>
                            <li><strong>Expedited Shipping (2-3 business days):</strong> $19.95.</li>
                            <li><strong>Overnight Shipping (1 business day):</strong> $34.95.</li>
                        </ul>
                        <p>Delivery delays can occasionally occur.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>International Shipping</h2>
                        <p>We ship to most addresses around the world. International shipping rates are calculated based on the weight of your order and the destination country. Please note that customers are responsible for any customs and import taxes that may apply.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>Shipment Confirmation & Order Tracking</h2>
                        <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                    </div>

                    <div className={styles.section}>
                        <h2>Damages</h2>
                        <p>Zaylo is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim.</p>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </main>
    );
}
