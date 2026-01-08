"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHero from '../../components/ui/PageHero';
import styles from './page.module.css';
import api from '../../lib/api';
import Link from 'next/link';

export default function Shop() {
    const [products, setProducts] = useState([
        { _id: '1', name: 'Azure Essence Perfume', price: 120, category: 'Perfumes', image: '/azure_essence.png', brand: 'Zaylo Luxury' },
        { _id: '2', name: 'Midnight Chrono Watch', price: 250, category: 'Watches', image: '/midnight_chrono.png', brand: 'Zaylo Time' },
        { _id: '3', name: 'Zaylo Tech Kit', price: 180, category: 'Gadgets', image: '/tech_kit.png', brand: 'Zaylo Tech' },
        { _id: '4', name: 'Zaylo Signature Tee', price: 45, category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop', brand: 'Zaylo' },
        { _id: '5', name: 'Casual Linen Shirt', price: 65, category: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop', brand: 'Zaylo' },
        { _id: '6', name: 'Desert Cargo Pants', price: 85, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad23f324e?q=80&w=1000&auto=format&fit=crop', brand: 'Zaylo' }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                if (data && data.length > 0) {
                    setProducts(data);
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const pageTitle = categoryParam ? `${categoryParam} Collection` : 'Exclusive Collection';
    const breadcrumbs = [
        { label: 'Shop', href: '/shop' }
    ];

    if (categoryParam) {
        breadcrumbs.push({ label: categoryParam, href: `/shop?category=${categoryParam}` });
    }

    return (
        <main>
            <Navbar />
            <PageHero
                title={pageTitle}
                subtitle="Curated products for the discerning individual."
                breadcrumbs={breadcrumbs}
            />

            <section className="container" style={{ padding: '4rem 1rem' }}>
                {loading ? (
                    <div style={{ color: 'white', textAlign: 'center' }}>Loading...</div>
                ) : (
                    <div className={styles.grid}>
                        {products.map((product) => (
                            <Link href={`/products/${product._id}`} key={product._id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={product.image} alt={product.name} className={styles.image} />
                                </div>
                                <div className={styles.info}>
                                    <span className={styles.category}>{product.category}</span>
                                    <h3 className={styles.name}>{product.name}</h3>
                                    <p className={styles.price}>${product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
