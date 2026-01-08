"use client";
import { createContext, useState, useEffect } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for token in localStorage on load
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/users/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            // Set token in api headers for future requests if we were using a global interceptor
            // For now simple storage is enough for the prototype
            return data;
        } catch (error) {
            console.error(error);
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        router.push('/login');
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/users', { name, email, password });
            // Don't log in automatically. Wait for email verification.
            return data;
        } catch (error) {
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    const updateProfile = async (userData) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await api.put('/users/profile', userData, config);
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return data;
        } catch (error) {
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
