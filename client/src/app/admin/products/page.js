"use client";
import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuPlus, LuPencil, LuTrash2, LuSearch, LuX, LuImage, LuTag, LuDollarSign, LuBriefcase } from 'react-icons/lu';
import styles from './Products.module.css';
import api from '../../../lib/api';
import AuthContext from '../../../context/AuthContext';

export default function AdminProducts() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);

    // Form Stats
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        cost: '',
        category: '',
        countInStock: '',
        description: '',
        images: [''],
    });

    const categories = ['Perfumes', 'Watches', 'Gadgets', 'Accessories'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            cost: product.cost || 0,
            category: product.category,
            countInStock: product.countInStock || 0,
            description: product.description,
            images: Array.isArray(product.images) ? [...product.images] : [product.image],
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await api.delete(`/products/${id}`, config);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert('Error deleting product');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const payload = { ...formData };

            if (editingProduct) {
                await api.put(`/products/${editingProduct._id}`, payload, config);
            } else {
                await api.post('/products', payload, config);
            }

            setIsModalOpen(false);
            fetchProducts();
            resetForm();
        } catch (error) {
            alert('Error saving product');
        }
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            cost: '',
            category: '',
            countInStock: '',
            description: '',
            images: [''],
        });
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleInfo}>
                    <h1>Manage Products</h1>
                    <p>Total {products.length} products in catalog</p>
                </div>
                <button className={styles.addBtn} onClick={() => { resetForm(); setIsModalOpen(true); }}>
                    <LuPlus /> Add New Product
                </button>
            </header>

            <div className={styles.tableControls}>
                <div className={styles.searchBox}>
                    <LuSearch />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <select onChange={(e) => setSearchTerm(e.target.value === 'All' ? '' : e.target.value)}>
                        <option value="All">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className={styles.loader}>Fetching products...</div>
            ) : (
                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product._id}>
                                    <td className={styles.productCell}>
                                        <img src={Array.isArray(product.images) ? product.images[0] : product.image} alt="" />
                                        <span>{product.name}</span>
                                    </td>
                                    <td><span className={styles.categoryBadge}>{product.category}</span></td>
                                    <td>${product.price}</td>
                                    <td>${product.cost || 0}</td>
                                    <td>
                                        <div className={styles.stockInfo}>
                                            <div className={styles.stockBar}>
                                                <div
                                                    className={styles.stockFill}
                                                    style={{
                                                        width: `${Math.min(100, (product.countInStock || 0) * 2)}%`,
                                                        backgroundColor: (product.countInStock || 0) < 5 ? '#ff6b6b' : '#4CAF50'
                                                    }}
                                                ></div>
                                            </div>
                                            <span>{product.countInStock || 0} left</span>
                                        </div>
                                    </td>
                                    <td className={styles.actions}>
                                        <button className={styles.editBtn} onClick={() => handleEdit(product)} title="Edit">
                                            <LuPencil />
                                        </button>
                                        <button className={styles.deleteBtn} onClick={() => handleDelete(product._id)} title="Delete">
                                            <LuTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Product Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <motion.div
                            className={styles.modal}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <div className={styles.modalHeader}>
                                <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <button className={styles.closeModal} onClick={() => setIsModalOpen(false)}>
                                    <LuX />
                                </button>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Category</label>
                                        <select
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Selling Price ($)</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Purchase Cost ($)</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.cost}
                                            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Stock Count</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.countInStock}
                                            onChange={(e) => setFormData({ ...formData, countInStock: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Image URL</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.images[0]}
                                            onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                        rows="4"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className={styles.modalFooter}>
                                    <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="submit" className={styles.saveBtn}>
                                        {editingProduct ? 'Update Product' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
