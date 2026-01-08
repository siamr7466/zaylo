"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import { LuLayoutDashboard, LuPackage, LuShoppingBag, LuUsers, LuArrowLeft, LuMenu, LuLogOut } from 'react-icons/lu';
import AuthContext from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, onToggle, onClose }) => {
    const pathname = usePathname();
    const { user, logout } = useContext(AuthContext);

    const menuItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LuLayoutDashboard /> },
        { name: 'Products', path: '/admin/products', icon: <LuPackage /> },
        { name: 'Orders', path: '/admin/orders', icon: <LuShoppingBag /> },
        { name: 'Users', path: '/admin/users', icon: <LuUsers /> },
    ];

    return (
        <>
            <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.collapsed}`}>
                <div className={styles.header}>
                    <div className={styles.logoRow}>
                        <h1 className={styles.logo}>Zaylo <span className={styles.logoText}>Admin</span></h1>
                        <button className={styles.toggleBtn} onClick={onToggle}>
                            <LuMenu />
                        </button>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => (
                        <Link
                            href={item.path}
                            key={item.name}
                            className={`${styles.link} ${pathname === item.path ? styles.active : ''}`}
                            onClick={onClose} // Only closes on mobile via overlay logic usually
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.footer}>
                    {/* User Info Section */}
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user?.name}</span>
                            <span className={styles.userRole}>Administrator</span>
                        </div>
                    </div>

                    <Link href="/" className={styles.backLink}>
                        <LuArrowLeft /> <span className={styles.backText}>Back to Store</span>
                    </Link>
                </div>
            </aside>
            {/* Mobile Overlay only */}
            <div className={`${styles.overlay} ${isOpen ? styles.showOverlay : ''}`} onClick={onClose}></div>
        </>
    );
};

export default Sidebar;
