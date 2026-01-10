"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuMapPin, LuMail, LuPhone, LuClock } from 'react-icons/lu';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHero from '../../components/ui/PageHero';
import styles from './Contact.module.css';
import api from '../../lib/api';

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [feedback, setFeedback] = useState('');
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                if (data) setSettings(data);
            } catch (err) {
                console.error("Failed to fetch settings:", err);
            }
        };

        fetchSettings();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const { data } = await api.post('/contact', formState);
            setStatus('success');
            setFeedback('Message sent successfully! We will get back to you soon.');
            setFormState({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('error');
            setFeedback(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    const contact = settings?.contact || {};

    return (
        <main className={styles.contactContainer}>
            <Navbar />
            <PageHero
                title="Get in Touch"
                subtitle="We'd love to hear from you. Please send us a message or visit us."
                breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
            />

            <div className="container">
                <div className={styles.grid}>
                    {/* Info Sidebar */}
                    <motion.div
                        className={styles.infoCard}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.infoItem}>
                            <div className={styles.iconWrapper}><LuMapPin size={20} /></div>
                            <div className={styles.infoContent}>
                                <h3>Visit Us</h3>
                                <p>{contact.address || '123 Fashion Avenue, New York, NY 10012'}</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.iconWrapper}><LuMail size={20} /></div>
                            <div className={styles.infoContent}>
                                <h3>Email Us</h3>
                                <p>{contact.email || 'support@zaylo.com'}<br />press@zaylo.com</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.iconWrapper}><LuPhone size={20} /></div>
                            <div className={styles.infoContent}>
                                <h3>Call Us</h3>
                                <p>{contact.phone || '+1 (555) 123-4567'}<br />Mon-Fri, 9am-6pm EST</p>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.iconWrapper}><LuClock size={20} /></div>
                            <div className={styles.infoContent}>
                                <h3>Opening Hours</h3>
                                <p>{contact.hours || 'Monday - Friday: 9am - 8pm'}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className={styles.formCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.formHeader}>
                            <h2>Send a Message</h2>
                            <p>Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        {status === 'success' && (
                            <div className={styles.successMessage}>
                                <FaCheckCircle className={styles.msgIcon} /> {feedback}
                            </div>
                        )}

                        {status === 'error' && (
                            <div className={styles.errorMessage}>
                                <FaExclamationCircle className={styles.msgIcon} /> {feedback}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Full Name</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email Address</label>
                                <input
                                    type="email"
                                    className={styles.input}
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Subject</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    required
                                    value={formState.subject}
                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea
                                    className={styles.textarea}
                                    required
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    disabled={status === 'loading'}
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                                {status === 'loading' ? <><FaSpinner className={styles.spin} /> Sending...</> : 'Send Message'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
