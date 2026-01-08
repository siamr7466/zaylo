"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronDown } from 'react-icons/lu';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageHero from '../../components/ui/PageHero';
import styles from './Faq.module.css';

const faqs = [
    {
        question: "How do I track my order?",
        answer: "Once your order has shipped, you will receive an email with a tracking number. You can also track your order status in your account under 'My Orders'."
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and with original tags attached. Please visit our Returns page to initiate a return."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location and are calculated at checkout."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can reach our support team via email at support@zaylo.com or through the contact form on our Contact Us page. We typically respond within 24 hours."
    },
    {
        question: "Are your products authentic?",
        answer: "Absolutely. We are an authorized retailer for all brands we carry. Every item is guaranteed 100% authentic and comes with original packaging and warranty cards where applicable."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay."
    }
];

export default function FaqPage() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main className={styles.faqContainer}>
            <Navbar />
            <PageHero
                title="Frequently Asked Questions"
                subtitle="Find answers to common questions about our products and services."
                breadcrumbs={[{ label: 'FAQ', href: '/faq' }]}
            />

            <div className={`container ${styles.content}`}>
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleFaq(index)}
                                aria-expanded={activeIndex === index}
                            >
                                {faq.question}
                                <LuChevronDown className={styles.icon} />
                            </button>
                            <div className={styles.answer}>
                                <p>{faq.answer}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </main>
    );
}
