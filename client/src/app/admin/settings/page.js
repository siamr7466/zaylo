"use client";
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import AuthContext from '../../../context/AuthContext';
import styles from './Settings.module.css';
import api from '../../../lib/api';

export default function SettingsPage() {
    const { token } = useContext(AuthContext);
    const router = useRouter();

    const [settings, setSettings] = useState({
        siteName: '',
        siteDescription: '',
        contact: {
            address: '',
            email: '',
            phone: '',
            hours: ''
        },
        socials: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        }
    });

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchSettings = async () => {
            try {
                const { data } = await api.get('/settings');
                if (data) setSettings(data);
            } catch (err) {
                console.error("Failed to fetch settings:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [token]);

    const handleChange = (e, section) => {
        const { name, value } = e.target;
        if (section) {
            setSettings(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: value
                }
            }));
        } else {
            setSettings(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await api.put('/settings', settings, config);

            setMessage({ type: 'success', text: 'Settings updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || err.message });
        }
    };

    if (loading) return <div className={styles.container}>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Site Settings</h1>
                <p>Manage your website's general information and contact details.</p>
            </div>

            {message && (
                <div className={`${styles.message} ${message.type === 'success' ? styles.success : styles.error}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* General Info */}
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>General Information</h2>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={settings.siteName}
                                onChange={(e) => handleChange(e)}
                                className={styles.input}
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Site Description</label>
                            <textarea
                                name="siteDescription"
                                value={settings.siteDescription}
                                onChange={(e) => handleChange(e)}
                                className={styles.textarea}
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Contact Information</h2>
                    <div className={styles.formGrid}>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={settings.contact?.address || ''}
                                onChange={(e) => handleChange(e, 'contact')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={settings.contact?.email || ''}
                                onChange={(e) => handleChange(e, 'contact')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={settings.contact?.phone || ''}
                                onChange={(e) => handleChange(e, 'contact')}
                                className={styles.input}
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Opening Hours</label>
                            <input
                                type="text"
                                name="hours"
                                value={settings.contact?.hours || ''}
                                onChange={(e) => handleChange(e, 'contact')}
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className={styles.card}>
                    <h2 className={styles.sectionTitle}>Social Media Links</h2>
                    <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Facebook URL</label>
                            <input
                                type="url"
                                name="facebook"
                                value={settings.socials?.facebook || ''}
                                onChange={(e) => handleChange(e, 'socials')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Twitter/X URL</label>
                            <input
                                type="url"
                                name="twitter"
                                value={settings.socials?.twitter || ''}
                                onChange={(e) => handleChange(e, 'socials')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Instagram URL</label>
                            <input
                                type="url"
                                name="instagram"
                                value={settings.socials?.instagram || ''}
                                onChange={(e) => handleChange(e, 'socials')}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>LinkedIn URL</label>
                            <input
                                type="url"
                                name="linkedin"
                                value={settings.socials?.linkedin || ''}
                                onChange={(e) => handleChange(e, 'socials')}
                                className={styles.input}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className={styles.saveBtn}>Save Changes</button>
            </form>
        </div>
    );
}
