"use client";
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import Footer from '../../components/layout/Footer';
import styles from './page.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.formCard}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    {error && <div className={styles.error}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.group}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Login</button>
                    </form>
                    <p className={styles.footerText}>
                        New to Zaylo? <Link href="/register" className={styles.link}>Create an Account</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
