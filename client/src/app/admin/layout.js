"use client";
import { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LuLayoutDashboard, LuPackage, LuShoppingBag, LuUsers, LuMenu } from 'react-icons/lu';
import AuthContext from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/Sidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout({ children }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        // Close sidebar by default on mobile/tablet
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Set initial state
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!loading && (!user || !user.isAdmin)) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LuLayoutDashboard /> },
        { name: 'Products', path: '/admin/products', icon: <LuPackage /> },
        { name: 'Orders', path: '/admin/orders', icon: <LuShoppingBag /> },
        { name: 'Users', path: '/admin/users', icon: <LuUsers /> },
    ];

    if (loading || !user || !user.isAdmin) {
        return <div className={styles.loading}>Checking permissions...</div>;
    }

    return (
        <div className={styles.adminContainer}>
            <AdminSidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onClose={() => setIsSidebarOpen(false)}
            />

            <main className={`${styles.mainContent} ${isSidebarOpen ? styles.shifted : ''}`}>
                {/* Mobile Floating Toggle (No navbar, just button) */}
                <button
                    className={styles.mobileFloatingToggle}
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <LuMenu />
                </button>

                <div className={styles.pageBody}>
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className={styles.bottomNav}>
                {menuItems.map((item) => (
                    <Link
                        href={item.path}
                        key={item.name}
                        className={`${styles.bottomNavItem} ${pathname === item.path ? styles.active : ''}`}
                    >
                        <span className={styles.bottomNavIcon}>{item.icon}</span>
                        <span className={styles.bottomNavText}>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
