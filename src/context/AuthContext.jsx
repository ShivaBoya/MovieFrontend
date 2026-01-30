import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try to get current user profile
                const { data } = await api.get('/auth/me'); // We need to add this route!
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = (data) => setUser(data);

    const googleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            // In a real app, you'd send result.user.accessToken to backend
            // For now, we'll just set the user state with Firebase data
            const user = result.user;
            setUser({
                _id: user.uid,
                username: user.displayName,
                email: user.email,
                avatar: user.photoURL
            });
            return user;
        } catch (error) {
            console.error("Google Sign In Error", error);
            throw error;
        }
    };

    const updateProfile = async (data) => {
        try {
            const response = await api.put('/auth/profile', data);
            setUser(response.data); // Update local state with new data
            return response.data;
        } catch (error) {
            console.error("Profile Update Error", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        api.post('/auth/logout');
    };

    return (
        <AuthContext.Provider value={{ user, login, googleSignIn, logout, loading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
