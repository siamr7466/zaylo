"use client";
import { useState, useEffect, useContext } from 'react';
import { LuMail, LuSend, LuUsers, LuCheckCircle, LuAlertCircle } from 'react-icons/lu';
import { FaSpinner } from 'react-icons/fa';
import api from '../../../lib/api';
import AuthContext from '../../../context/AuthContext';
import styles from './Newsletter.module.css';

export default function AdminNewsletter() {
    const { user } = useContext(AuthContext);
    const [subscribers, setSubscribers] = useState([]);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await api.get('/newsletter', config);
            setSubscribers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            setLoading(false);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!subject || !message) return;

        if (!confirm(`Send this email to ${subscribers.length} subscribers?`)) return;

        setStatus('sending');
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await api.post('/newsletter/send', { subject, message }, config);
            setStatus('success');
            setFeedback(data.message);
            setSubject('');
            setMessage('');
        } catch (error) {
            setStatus('error');
            setFeedback(error.response?.data?.message || 'Failed to send newsletter');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleInfo}>
                    <h1>Newsletter Dashboard</h1>
                    <p>Manage subscribers and broadcast emails</p>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <LuUsers className={styles.icon} />
                        <div>
                            <h3>{loading ? '...' : subscribers.length}</h3>
                            <p>Subscribers</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.grid}>
                {/* Compose Email */}
                <div className={styles.card}>
                    <h2><LuMail /> Compose Broadcast</h2>
                    <form onSubmit={handleSend} className={styles.form}>
                        {status === 'success' && (
                            <div className={`${styles.alert} ${styles.success}`}>
                                <LuCheckCircle /> {feedback}
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={`${styles.alert} ${styles.error}`}>
                                <LuAlertCircle /> {feedback}
                            </div>
                        )}

                        <div className={styles.group}>
                            <label>Subject Line</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g. 50% Off Summer Sale!"
                                required
                            />
                        </div>

                        <div className={styles.group}>
                            <label>Message Content</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your message here... (HTML or Text)"
                                rows={8}
                                required
                            />
                        </div>

                        <div className={styles.actions}>
                            <p className={styles.note}>Will be sent to <strong>{subscribers.length}</strong> people.</p>
                            <button type="submit" className={styles.sendBtn} disabled={status === 'sending' || subscribers.length === 0}>
                                {status === 'sending' ? <><FaSpinner className={styles.spin} /> Sending...</> : <><LuSend /> Send to All</>}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Subscribers List */}
                <div className={styles.card}>
                    <h2><LuUsers /> Latest Subscribers</h2>
                    <div className={styles.list}>
                        {loading ? <p>Loading...</p> : (
                            subscribers.length === 0 ? <p>No subscribers yet.</p> : (
                                <ul className={styles.subList}>
                                    {subscribers.slice(0, 10).map((sub, idx) => (
                                        <li key={idx}>
                                            <span className={styles.email}>{sub.email}</span>
                                            <span className={styles.date}>{new Date(sub.subscribedAt).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                    {subscribers.length > 10 && <li className={styles.more}>...and {subscribers.length - 10} more</li>}
                                </ul>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
