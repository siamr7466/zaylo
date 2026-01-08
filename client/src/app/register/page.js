"use client";
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import Footer from '../../components/layout/Footer';
import styles from '../login/page.module.css'; // Reusing login styles

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { register, user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register(name, email, password);
            router.push('/');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.formCard}>
                    <h1 className={styles.title}>Create Account</h1>
                    {error && <div className={styles.error}>{error}</div>}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.group}>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
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
                        <div className={styles.group}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>Register</button>
                    </form>
                    <p className={styles.footerText}>
                        Already have an account? <Link href="/login" className={styles.link}>Login</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
