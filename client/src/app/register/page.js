"use client";
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import Footer from '../../components/layout/Footer';
import { LuMailCheck } from 'react-icons/lu';
import styles from '../login/page.module.css';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');

    const { register, user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await register(name, email, password);
            setSuccess(true);
            setMessage(data.message || 'Registration successful! Please check your email to verify your account.');
        } catch (err) {
            setError(err);
        }
    };

    if (success) {
        return (
            <main className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.formCard} style={{ textAlign: 'center' }}>
                        <LuMailCheck size={50} color="#4CAF50" style={{ marginBottom: '20px' }} />
                        <h1 className={styles.title} style={{ marginBottom: '10px' }}>Check Your Email</h1>
                        <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '30px' }}>
                            {message}
                        </p>
                        <Link href="/login" className={styles.submitBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
                            Go to Login
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

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
