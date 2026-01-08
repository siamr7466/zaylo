"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './TrendingProducts.module.css';
import api from '../../lib/api';

const TrendingProducts = () => {
    const [products, setProducts] = useState([
        { _id: '1', name: 'Azure Essence Perfume', price: 120, category: 'Perfumes', image: '/azure_essence.png' },
        { _id: '2', name: 'Midnight Chrono Watch', price: 250, category: 'Watches', image: '/midnight_chrono.png' },
        { _id: '3', name: 'Zaylo Tech Kit', price: 180, category: 'Gadgets', image: '/tech_kit.png' },
        { _id: '4', name: 'Nightshade Hoodie', price: 75, category: 'Clothing', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop' }
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                if (data && data.length > 0) {
                    setProducts(data.slice(0, 4));
                }
            } catch (error) {
                console.error('Error fetching trending products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Trending Now</h2>
                    <Link href="/shop" className={styles.viewAll}>View All</Link>
                </div>
                <div className={styles.grid}>
                    {products.map((product) => (
                        <div key={product._id} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <img src={product.image} alt={product.name} className={styles.image} />
                            </div>
                            <div className={styles.info}>
                                <span className={styles.category}>{product.category}</span>
                                <h3 className={styles.name}>{product.name}</h3>
                                <p className={styles.price}>${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
