import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import MovieForm from './MovieForm';

const MovieDrawer = ({ isOpen, onClose, initialData, onSubmit }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl z-50 flex flex-col h-full"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    >
                        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                                {initialData ? 'Edit Movie' : 'Add New Movie'}
                            </h2>
                            <button
                                className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                                onClick={onClose}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <MovieForm
                                onSubmit={onSubmit}
                                initialData={initialData}
                                onClose={onClose}
                                isDrawer={true}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MovieDrawer;
