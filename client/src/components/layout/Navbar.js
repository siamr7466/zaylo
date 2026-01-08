"use client";
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuSearch, LuShoppingBag, LuUser, LuMenu, LuX, LuLogOut } from 'react-icons/lu';
import styles from './Navbar.module.css';
import CartContext from '../../context/CartContext';
import AuthContext from '../../context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartItems } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu OR search is open
    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen, isSearchOpen]);

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
            setIsSearchOpen(false);
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const handleHomeClick = (e) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });

            const scrollContainer = document.querySelector('[data-scroll-container]');
            if (scrollContainer && window.locomotiveScroll) {
                window.locomotiveScroll.scrollTo(0);
            }
        }
    };

    // ... existing helpers ...

    // Hide Navbar on Admin Pages
    if (usePathname().startsWith('/admin')) return null;

    return (
        <motion.nav
            className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
            animate={{
                y: 0,
                opacity: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(16px)',
            }}
            transition={{ duration: 0.5, ease: "circOut" }}
        >
            {/* ... left, center, right sections ... */}

            <div className={`container ${styles.navContainer}`}>
                {/* ... existing left and center ... */}
                <div className={styles.left}>
                    {/* ... menu button ... */}
                    <motion.button
                        className={styles.menuBtn}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <LuMenu />
                    </motion.button>
                </div>

                <div className={styles.center}>
                    <Link href="/" className={styles.logo} onClick={handleHomeClick}>
                        <motion.span
                            animate={{ scale: isScrolled ? 0.9 : 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            Zaylo
                        </motion.span>
                    </Link>
                </div>

                <div className={styles.right}>
                    <div className={styles.navIcons}>
                        <motion.button
                            className={styles.iconBtn}
                            onClick={() => setIsSearchOpen(true)} // Open search overlay
                            aria-label="Search"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <LuSearch />
                        </motion.button>

                        {/* ... cart and user icons ... */}
                        <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={styles.iconInner}
                            >
                                <LuShoppingBag />
                                {cartItemCount > 0 && (
                                    <span className={styles.cartCount}>{cartItemCount}</span>
                                )}
                            </motion.div>
                        </Link>

                        {user ? (
                            <div className={styles.userSection}>
                                <Link href="/profile" className={styles.iconBtn} aria-label="Profile">
                                    <LuUser />
                                </Link>
                                <button className={`${styles.iconBtn} ${styles.hideOnMobile}`} onClick={logout} aria-label="Logout">
                                    <LuLogOut />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className={styles.iconBtn} aria-label="Account">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={styles.iconInner}
                                >
                                    <LuUser />
                                </motion.div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            <div className={`${styles.searchOverlay} ${isSearchOpen ? styles.searchOverlayOpen : ''}`}>
                <button className={styles.closeSearchBtn} onClick={() => setIsSearchOpen(false)}>
                    <LuX />
                </button>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Type to search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        autoFocus={isSearchOpen}
                    />
                    <p className={styles.searchHelpText}>Press Enter to search</p>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* ... existing mobile menu code ... */}
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className={styles.mobileMenuHeader}>
                                <span className={styles.menuTitle}>Menu</span>
                                <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                                    <LuX />
                                </button>
                            </div>
                            <div className={styles.mobileLinks}>
                                <Link href="/" className={styles.mobileLink} onClick={(e) => { setIsMenuOpen(false); handleHomeClick(e); }}>Home</Link>
                                <Link href="/shop" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Shop</Link>
                                <Link href="/shop?category=watches" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Watches</Link>
                                <Link href="/shop?category=perfumes" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Perfumes</Link>
                                <Link href="/shop?category=gadgets" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Gadgets</Link>
                                <Link href="/shop?category=accessories" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Accessories</Link>
                                {user && (
                                    <Link href="/profile" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>Profile Settings</Link>
                                )}
                            </div>
                            <div className={styles.mobileFooter}>
                                {user ? (
                                    <div className={styles.loggedInFooter}>
                                        <p className={styles.welcomeText}>Welcome, {user.name}</p>
                                        <button className={styles.mobileBtnSecondary} onClick={() => { logout(); setIsMenuOpen(false); }}>
                                            <LuLogOut /> Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/login" className={styles.mobileBtn} onClick={() => setIsMenuOpen(false)}>
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.overlay}
                            onClick={() => setIsMenuOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
