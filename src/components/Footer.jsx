import React from 'react';
import { Github, Twitter, Heart, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const iconVariants = {
        idle: { rotateY: 0, scale: 1 },
        hover: {
            rotateY: 360,
            scale: 1.2,
            color: "#60A5FA",
            transition: { duration: 0.6, ease: "easeInOut" }
        }
    };

    return (
        <motion.footer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border-t border-slate-200 dark:border-slate-800/50 py-10 mt-auto relative overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-600 dark:text-slate-400">

                <div className="flex flex-col items-center md:items-start gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                    >
                        Movie App
                    </motion.div>
                    <p className="font-medium text-slate-500">
                        &copy; {currentYear} Created by Shiva.
                    </p>
                    <p className="flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        Built with <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" /> using React, Node & Tailwind
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <motion.a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Privacy Policy</motion.a>
                    <motion.a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Terms of Service</motion.a>

                    <div className="flex gap-5 pl-8 border-l border-slate-300 dark:border-slate-700 h-8 items-center">
                        <motion.a
                            variants={iconVariants}
                            initial="idle"
                            whileHover="hover"
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-700 dark:text-slate-300"
                        >
                            <Github size={20} />
                        </motion.a>
                        <motion.a
                            variants={iconVariants}
                            initial="idle"
                            whileHover="hover"
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-700 dark:text-slate-300"
                        >
                            <Twitter size={20} />
                        </motion.a>
                        <motion.a
                            variants={iconVariants}
                            initial="idle"
                            whileHover="hover"
                            href="#"
                            className="text-slate-700 dark:text-slate-300"
                        >
                            <Instagram size={20} />
                        </motion.a>
                    </div>
                </div>

            </div>
        </motion.footer>
    );
};

export default Footer;
