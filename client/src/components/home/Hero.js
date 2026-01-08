"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
    const slideModels = [
        '/model_perfume.png',
        '/model_watch.png',
        '/model_gadget.png'
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slideModels.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className={styles.heroSection}>
            {/* Background Studio Light Effect */}
            <motion.div
                className={styles.studioLight}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Model Display */}
            <div className={styles.modelContainer}>
                <motion.div
                    key={current}
                    className={styles.modelView}
                    style={{ backgroundImage: `url(${slideModels[current]})` }}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    role="img"
                    aria-label="Fashion Model"
                />
            </div>

            {/* Content Overlay */}
            <div className={styles.overlay}>
                <div className={`container ${styles.container}`}>
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.h2
                            className={styles.exclusiveBrand}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            EXCLUSIVE BRAND
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/shop" className={styles.pillBtn}>
                                Shop Now
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
