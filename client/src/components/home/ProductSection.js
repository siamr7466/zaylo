"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './ProductSection.module.css';
import api from '../../lib/api';
import { getProductsBySection } from '../../data/products';

const ProductSection = ({ title, apiEndpoint }) => {
    const [products, setProducts] = useState(getProductsBySection(title));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!apiEndpoint) return;

            setLoading(true);
            try {
                const { data } = await api.get(apiEndpoint);
                if (data && data.length > 0) {
                    setProducts(data.slice(0, 4));
                }
            } catch (error) {
                console.error(`Error fetching ${title}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [apiEndpoint, title]);

    return (
        <section className={styles.section}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>{title}</h2>
                    <Link href="/shop" className={styles.viewAll}>View All</Link>
                </motion.div>

                {loading ? (
                    <div className={styles.loading}>Loading products...</div>
                ) : (
                    <div className={styles.grid}>
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                            >
                                <Link href={`/products/${product._id}`} className={styles.cardLink}>
                                    <motion.div
                                        className={styles.card}
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={styles.imageWrapper}>
                                            <img
                                                src={Array.isArray(product.images) ? product.images[0] : product.image}
                                                alt={product.name}
                                                className={styles.image}
                                            />
                                            <div className={styles.overlay}>
                                                <motion.button
                                                    className={styles.cartBtn}
                                                    onClick={(e) => e.preventDefault()}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Quick Add
                                                </motion.button>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <span className={styles.category}>{product.category}</span>
                                            <h3 className={styles.name}>{product.name}</h3>
                                            <div className={styles.priceRow}>
                                                <p className={styles.price}>${product.price}</p>
                                                {product.rating && (
                                                    <div className={styles.rating}>
                                                        <span className={styles.star}>★</span>
                                                        <span>{typeof product.rating === 'object' ? product.rating.average : product.rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductSection;
