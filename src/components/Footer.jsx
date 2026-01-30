import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600 dark:text-slate-400">

                <div className="flex flex-col items-center md:items-start gap-1">
                    <p className="font-medium">
                        &copy; {currentYear} Movie Manager. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1 text-xs">
                        Built with <Heart size={12} className="text-red-500 fill-red-500" /> using React, Node & Tailwind
                    </p>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</a>
                    <div className="flex gap-4 pl-4 border-l border-slate-300 dark:border-slate-700">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                            <Github size={18} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
