import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { login, googleSignIn } = useAuth();

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            // Use centralized api instance
            const { data } = await api.post(endpoint, formData);
            login(data);
            toast.success(isLogin ? `Welcome back!` : `Account created!`);
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            toast.success("Signed in with Google!");
            onClose();
        } catch (error) {
            toast.error("Google Sign In failed");
        }
    };

    return (
        <div className="fixed inset-0 z-[50000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400">
                            {isLogin ? 'Sign in to access your collection' : 'Join us to start your journey'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Google Button */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" /><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" /><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" /><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.799 L -6.734 42.379 C -8.804 40.439 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" /></g></svg>
                            Continue with Google
                        </button>

                        <div className="relative flex items-center gap-2 py-2">
                            <div className="h-px bg-slate-800 flex-1" />
                            <span className="text-slate-500 text-xs uppercase font-bold">Or</span>
                            <div className="h-px bg-slate-800 flex-1" />
                        </div>

                        {/* Email Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {!isLogin && (
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-400 ml-1">Username</label>
                                    <div className="bg-slate-950 border border-slate-700 rounded-xl flex items-center px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                        <User size={18} className="text-slate-500 mr-3" />
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Enter your username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required={!isLogin}
                                            className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                                <div className="bg-slate-950 border border-slate-700 rounded-xl flex items-center px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                    <Mail size={18} className="text-slate-500 mr-3" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
                                <div className="bg-slate-950 border border-slate-700 rounded-xl flex items-center px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                                    <Lock size={18} className="text-slate-500 mr-3" />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent text-white w-full focus:outline-none placeholder:text-slate-600"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                            >
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginModal;
