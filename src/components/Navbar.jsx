import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { LogOut, Sun, Moon, User, Menu, X, Plus, List as ListIcon } from 'lucide-react';

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

    return (
        <nav className="sticky top-0 z-40 w-full backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                        Movie Application
                    </span>
                </Link>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* My Collection Link */}
                    {user && (
                        <Link
                            to="/collection"
                            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            My Collection
                        </Link>
                    )}

                    {/* Add Movie Button (Desktop) */}
                    {user && (
                        <button
                            onClick={() => openDrawer()}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:-translate-y-0.5 transition-all text-sm"
                        >
                            <Plus size={18} />
                            <span>Add Movie</span>
                        </button>
                    )}

                    {/* Auth State */}
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                                    {user.username?.[0]?.toUpperCase()}
                                </div>
                                <span>{user.username}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => openLoginModal()}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => openLoginModal()}
                                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50"
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
                                className="flex items-center gap-3 p-3 text-slate-900 dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            >
                                <ListIcon size={20} />
                                <span>My Collection</span>
                            </Link>
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-3 p-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>
                            <button
                                onClick={() => {
                                    openDrawer();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-3 p-3 text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 rounded-lg font-semibold shadow-md"
                            >
                                <Plus size={20} />
                                <span>Add Movie</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                                className="w-full text-center px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                                className="w-full text-center px-4 py-3 rounded-lg bg-blue-600 text-white font-bold"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            )}

        </nav>
    );
};

export default Navbar;
