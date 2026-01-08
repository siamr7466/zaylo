"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuChevronRight } from 'react-icons/lu';
import styles from './PageHero.module.css';

const PageHero = ({ title, subtitle, breadcrumbs = [] }) => {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    {/* Breadcrumbs */}
                    <motion.div
                        className={styles.breadcrumbs}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
                        {breadcrumbs.map((crumb, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <LuChevronRight className={styles.separator} size={14} />
                                {crumb.href ? (
                                    <Link href={crumb.href} className={styles.breadcrumbLink}>
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className={styles.activeBreadcrumb}>{crumb.label}</span>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    {/* Title & Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <h1 className={styles.title}>{title}</h1>
                        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
