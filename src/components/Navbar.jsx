import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { LogOut, Sun, Moon, User, Menu, X, Plus, List as ListIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { openDrawer, openLoginModal } = useUI();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    // 3D Button Variant
    const button3D = {
        rest: { scale: 1, y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
        hover: {
            scale: 1.05,
            y: -2,
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
        },
        tap: { scale: 0.95, y: 0, boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" }
    };

    return (
        <nav className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-white/10 bg-white/70 dark:bg-slate-900/70 transition-colors duration-300 shadow-2xl shadow-black/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group perspective-1000">
                    <motion.div
                        whileHover={{
                            rotateX: 10,
                            rotateY: 10,
                            scale: 1.1,
                            filter: "brightness(1.2)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm"
                        style={{ perspective: 1000 }}
                    >
                        Movie App
                    </motion.div>
                </Link>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <motion.button
                        variants={button3D}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md border border-white/20 dark:border-slate-700/50"
                        title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>

                    {/* My Collection Link */}
                    {user && (
                        <Link to="/collection">
                            <motion.span
                                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-colors px-3 py-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                My Collection
                            </motion.span>
                        </Link>
                    )}

                    {/* Add Movie Button (Desktop) */}
                    {user && (
                        <motion.button
                            variants={button3D}
                            initial="rest"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => openDrawer()}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/30 border border-blue-400/20"
                        >
                            <Plus size={18} strokeWidth={3} />
                            <span>Add Movie</span>
                        </motion.button>
                    )}

                    {/* Auth State */}
                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <Link to="/profile" className="flex items-center gap-3 group">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-md shadow-pink-500/20 text-sm"
                                >
                                    {user.username?.[0]?.toUpperCase()}
                                </motion.div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-500 transition-colors">{user.username}</span>
                            </Link>
                            <motion.button
                                variants={button3D}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                            >
                                <LogOut size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </motion.button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <motion.button
                                variants={button3D}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => openLoginModal()}
                                className="px-5 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Log In
                            </motion.button>
                            <motion.button
                                variants={button3D}
                                initial="rest"
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => openLoginModal()}
                                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 border border-blue-400/20"
                            >
                                Sign Up
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>

            {/* Mobile Menu Dropdown with AnimatePresence */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -20 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                                            {user.username?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white">{user.username}</p>
                                            <p className="text-xs text-slate-500">View Profile</p>
                                        </div>
                                    </Link>
                                    <Link
                                        to="/collection"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 p-3 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                                    >
                                        <ListIcon size={20} />
                                        <span>My Collection</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            toggleTheme();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                                    >
                                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            openDrawer();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 p-3 text-white bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl font-bold shadow-md"
                                    >
                                        <Plus size={20} />
                                        <span>Add Movie</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl font-medium"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                                        className="w-full text-center px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                                        className="w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
    );
};

export default Navbar;
