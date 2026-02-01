import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', formData);
            login(data);
            toast.success(`Welcome back, ${data.username || 'User'}!`);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            toast.error('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden bg-slate-950">
            {/* Animated Background */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-blue-600/20 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, -90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-purple-600/20 rounded-full blur-[100px]"
            />

            <motion.div
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{ rotateX: 2, rotateY: 2, scale: 1.01 }}
                className="w-full max-w-md bg-white/5 dark:bg-slate-900/50 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-blue-500/10 p-8 border border-white/10 relative z-10"
                style={{ perspective: 1000 }}
            >
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent mb-3"
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-400 font-medium"
                    >
                        Sign in to continue your cinematic journey
                    </motion.p>
                </div>

                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm text-center font-semibold"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="space-y-4">
                        <motion.div whileFocusWithin={{ scale: 1.02 }} className="relative group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/50 border border-slate-700/50 group-hover:border-blue-500/50 p-4 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                            />
                        </motion.div>
                        <motion.div whileFocusWithin={{ scale: 1.02 }} className="relative group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/50 border border-slate-700/50 group-hover:border-blue-500/50 p-4 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-600"
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/25 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative">Sign In</span>
                    </motion.button>
                </form>

                <p className="mt-8 text-center text-slate-400">
                    New to Movie App?{' '}
                    <Link to="/signup">
                        <motion.span
                            whileHover={{ scale: 1.1, color: "#60A5FA" }}
                            className="text-blue-400 font-bold inline-block cursor-pointer"
                        >
                            Create Account
                        </motion.span>
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
