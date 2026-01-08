"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import styles from './CategoryShowcase.module.css';

const CategoryShowcase = () => {
    const categories = [
        {
            id: 1,
            name: 'Perfumes',
            image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
            description: 'Luxurious fragrances',
            count: '24 Products'
        },
        {
            id: 2,
            name: 'Watches',
            image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop',
            description: 'Timeless elegance',
            count: '18 Products'
        },
        {
            id: 3,
            name: 'Gadgets',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
            description: 'Tech essentials',
            count: '32 Products'
        },
        {
            id: 4,
            name: 'Clothing',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
            description: 'Fashion forward',
            count: '45 Products'
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
                    <div className={styles.headerContent}>
                        <h2 className={styles.title}>Explore Collections</h2>
                        <p className={styles.subtitle}>
                            Discover our curated selection of premium products across multiple categories
                        </p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/shop" className={styles.viewAllBtn}>
                            View All <LuArrowRight />
                        </Link>
                    </motion.div>
                </motion.div>

                <div className={styles.grid}>
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15
                            }}
                        >
                            <Link href={`/shop?category=${category.name}`} className={styles.categoryCard}>
                                <motion.div
                                    className={styles.imageWrapper}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className={styles.image}
                                    />
                                    <div className={styles.overlay}>
                                        <div className={styles.content}>
                                            <h3 className={styles.categoryName}>{category.name}</h3>
                                            <p className={styles.description}>{category.description}</p>
                                            <span className={styles.count}>{category.count}</span>
                                        </div>
                                        <motion.div
                                            className={styles.arrow}
                                            initial={{ x: -10, opacity: 0 }}
                                            whileHover={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <LuArrowRight />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
