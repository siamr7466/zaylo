"use client";
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CartContext from '../../context/CartContext';
import AuthContext from '../../context/AuthContext';
import styles from './page.module.css';
import api from '../../lib/api';

export default function CheckoutPage() {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (!user) router.push('/login');
        if (cartItems.length === 0) router.push('/cart');
    }, [user, cartItems, router]);

    // Calculations
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 20);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    const placeOrderHandler = async () => {
        try {
            const { data } = await api.post(
                '/orders',
                {
                    orderItems: cartItems,
                    shippingAddress: {
                        address,
                        city,
                        postalCode,
                        country,
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            clearCart();
            router.push(`/orders/${data._id}`); // Placeholder: view order not built yet
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Checkout</h1>
                <div className={styles.grid}>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <h2 className={styles.stepTitle}>1. Shipping & Payment</h2>
                            <form className={styles.form}>
                                <div className={styles.group}>
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className={styles.input}
                                        required
                                    />
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.group}>
                                        <label>City</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                    <div className={styles.group}>
                                        <label>Postal Code</label>
                                        <input
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={styles.group}>
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.group}>
                                    <label>Payment Method</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className={styles.input}
                                    >
                                        <option value="Card">Credit/Debit Card</option>
                                        <option value="PayPal">PayPal</option>
                                        <option value="COD">Cash on Delivery</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Items</span>
                            <span>${itemsPrice}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>${shippingPrice}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Tax</span>
                            <span>${taxPrice}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>
                        <button
                            onClick={placeOrderHandler}
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1.5rem' }}
                            disabled={!address || !city || !country}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
