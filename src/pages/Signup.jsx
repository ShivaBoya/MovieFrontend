import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden bg-slate-950">
            {/* Animated Background */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -60, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] right-[10%] w-[70vw] h-[70vw] bg-pink-600/20 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.4, 1],
                    rotate: [0, 60, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] left-[10%] w-[70vw] h-[70vw] bg-indigo-600/20 rounded-full blur-[100px]"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
                className="w-full max-w-md bg-white/5 dark:bg-slate-900/50 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-indigo-500/10 p-8 border border-white/10 relative z-10"
                style={{ perspective: 1000 }}
            >
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-3"
                    >
                        Join Us
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-400 font-medium"
                    >
                        Start building your collection today
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <motion.div
                        className="space-y-4"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        <motion.div variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }} whileFocusWithin={{ scale: 1.02 }}>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/50 border border-slate-700/50 p-4 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder:text-slate-600"
                            />
                        </motion.div>
                        <motion.div variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }} whileFocusWithin={{ scale: 1.02 }}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-slate-950/50 border border-slate-700/50 p-4 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder:text-slate-600"
                            />
                        </motion.div>
                        <motion.div variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }} whileFocusWithin={{ scale: 1.02 }}>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="w-full bg-slate-950/50 border border-slate-700/50 p-4 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder:text-slate-600"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(236, 72, 153, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="mt-4 bg-gradient-to-r from-pink-500 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/25 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative">Create Account</span>
                    </motion.button>
                </form>

                <p className="mt-8 text-center text-slate-400">
                    Already match?{' '}
                    <Link to="/login">
                        <motion.span
                            whileHover={{ scale: 1.1, color: "#F472B6" }}
                            className="text-pink-400 font-bold inline-block cursor-pointer"
                        >
                            Log In
                        </motion.span>
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
