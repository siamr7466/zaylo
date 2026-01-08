"use client";
import { useEffect, useState, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import styles from './VerifyEmail.module.css';

export default function VerifyEmail({ params }) {
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');
    const router = useRouter();
    const processedRef = useRef(false);

    // Unwrap params using React.use()
    const { token } = use(params);

    useEffect(() => {
        if (processedRef.current || !token) return;
        processedRef.current = true;

        const verify = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/verify-email`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token })
                });

                const data = await res.json();

                if (res.ok) {
                    setStatus('success');
                    setMessage('Email verified successfully! You can now log in.');
                    // Redirect after 3 seconds
                    setTimeout(() => router.push('/login'), 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Verification failed.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('An unexpected error occurred.');
            }
        };

        verify();
    }, [token, router]);

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {status === 'verifying' && (
                    <div className={styles.content}>
                        <FaSpinner className={`${styles.icon} ${styles.spin}`} />
                        <h2>Verifying...</h2>
                        <p>{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className={`${styles.content} ${styles.success}`}>
                        <FaCheckCircle className={styles.icon} />
                        <h2>Verified!</h2>
                        <p>{message}</p>
                        <Link href="/login" className="btn btn-primary">Go to Login</Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className={`${styles.content} ${styles.error}`}>
                        <FaTimesCircle className={styles.icon} />
                        <h2>Verification Failed</h2>
                        <p>{message}</p>
                        <Link href="/contact" className="btn btn-secondary">Contact Support</Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
