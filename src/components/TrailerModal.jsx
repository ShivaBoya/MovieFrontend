import React from 'react';
import { X } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';

const TrailerModal = () => {
    const { trailerVideo, closeTrailer } = useUI();

    if (!trailerVideo) return null;

    return (
        <div className="fixed inset-0 z-[60000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl border border-slate-800 overflow-hidden"
            >
                <button
                    onClick={closeTrailer}
                    className="absolute -top-10 right-0 md:top-4 md:right-4 text-white hover:text-red-500 transition-colors z-50 bg-black/50 p-2 rounded-full"
                >
                    <X size={24} />
                </button>

                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerVideo}?autoplay=1&rel=0`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </motion.div>
        </div>
    );
};

export default TrailerModal;
