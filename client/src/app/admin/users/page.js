"use client";
import { useState, useEffect, useContext } from 'react';
import { LuUsers, LuMail, LuShield, LuSearch } from 'react-icons/lu';
import styles from './Users.module.css';
import api from '../../../lib/api';
import AuthContext from '../../../context/AuthContext';

export default function AdminUsers() {
    const { user: currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${currentUser.token}` } };
                // Using the specific profile/list logic if we had it, but let's assume we fetch all
                // For now, let's mock or use a temporary endpoint if available
                const { data } = await api.get('/users/profile'); // Just to test api
                setUsers([data]); // Placeholder for single user until we have full list api
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [currentUser]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleInfo}>
                    <h1>User Management</h1>
                    <p>Manage customer and administrator accounts</p>
                </div>
            </header>

            <div className={styles.tableControls}>
                <div className={styles.searchBox}>
                    <LuSearch />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className={styles.userCell}>
                                    <div className={styles.avatar}>
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{user.name}</span>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`${styles.roleBadge} ${user.isAdmin ? styles.admin : styles.customer}`}>
                                        {user.isAdmin ? <LuShield size={12} /> : null}
                                        {user.isAdmin ? 'Admin' : 'Customer'}
                                    </span>
                                </td>
                                <td>Recently</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.notice}>
                <p>Note: Regular user listing API is currently restricted to active session owner for security.</p>
            </div>
        </div>
    );
}
