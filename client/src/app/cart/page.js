"use client";
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CartContext from '../../context/CartContext';
import AuthContext from '../../context/AuthContext';
import styles from './page.module.css';

export default function CartPage() {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const checkoutHandler = () => {
        if (!user) {
            router.push('/login?redirect=shipping');
        } else {
            router.push('/checkout'); // We haven't built this yet, but logic is sound
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Shopping Cart</h1>

                {cartItems.length === 0 ? (
                    <div className={styles.empty}>
                        Your cart is empty. <Link href="/shop" className={styles.link}>Go Back</Link>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        <div className={styles.items}>
                            {cartItems.map((item) => (
                                <div key={item._id} className={styles.item}>
                                    <img src={item.image} alt={item.name} className={styles.image} />
                                    <div className={styles.details}>
                                        <Link href={`/products/${item._id}`} className={styles.name}>{item.name}</Link>
                                        <p className={styles.price}>${item.price}</p>
                                    </div>
                                    <div className={styles.actions}>
                                        <select
                                            value={item.qty}
                                            onChange={(e) => addToCart(item, Number(e.target.value) - item.qty)} // Logic adjust for addToCart implementation
                                            className={styles.select}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={() => removeFromCart(item._id)} className={styles.removeBtn}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <h2 className={styles.summaryTitle}>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            <p className={styles.totalPrice}>${subtotal}</p>
                            <button
                                onClick={checkoutHandler}
                                className="btn btn-primary"
                                style={{ width: '100%' }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
