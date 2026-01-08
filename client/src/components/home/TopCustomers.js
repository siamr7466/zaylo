"use client";
import { motion } from 'framer-motion';
import styles from './TopCustomers.module.css';

const TopCustomers = () => {
    const customers = [
        {
            id: 1,
            name: "Alexandra V.",
            role: "Fashion Blogger",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
            quote: "Zaylo's collection is simply breathtaking. The quality of the materials and the attention to detail is unmatched."
        },
        {
            id: 2,
            name: "Marcus J.",
            role: "Creative Director",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
            quote: "I've been looking for a brand that combines modern aesthetics with classic craftsmanship. Zaylo is that brand."
        },
        {
            id: 3,
            name: "Elena R.",
            role: "Model",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
            quote: "The pieces are so versatile and elegant. They've quickly become my go-to for both causal and formal events."
        }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>Top Customers</h2>
                    <p className={styles.subtitle}>
                        Our community of style-forward individuals who define the Zaylo aesthetic.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {customers.map((customer, index) => (
                        <motion.div
                            key={customer.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2
                            }}
                            whileHover={{ y: -5 }}
                        >
                            <motion.div
                                className={styles.imageWrapper}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={customer.image}
                                    alt={customer.name}
                                    className={styles.image}
                                />
                            </motion.div>
                            <div className={styles.content}>
                                <p className={styles.quote}>"{customer.quote}"</p>
                                <h3 className={styles.name}>{customer.name}</h3>
                                <p className={styles.role}>{customer.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopCustomers;
