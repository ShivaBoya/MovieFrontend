import React from 'react';
import { motion } from 'framer-motion';
import { Film } from 'lucide-react';

export const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-800 rounded-2xl p-6 h-64 border border-slate-700 animate-pulse flex flex-col gap-4">
                    <div className="h-6 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/3 mb-4"></div>
                    <div className="mt-auto flex justify-between">
                        <div className="h-4 bg-slate-700 rounded w-12"></div>
                        <div className="h-4 bg-slate-700 rounded w-12"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const EmptyState = ({ onAdd }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center p-12 md:p-16 text-center border-2 border-dashed border-slate-700 rounded-3xl mt-8 bg-slate-800/20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="bg-slate-800 p-6 rounded-full mb-6 ring-4 ring-slate-800/50">
                <Film size={48} className="text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200 mb-2">No Movies Found</h2>
            <p className="text-slate-400 mb-8 max-w-sm">
                Your collection is looking a bit empty. Start building your personal movie database today.
            </p>
            <button
                className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                onClick={onAdd}
            >
                Create your first movie
            </button>
        </motion.div>
    );
};
