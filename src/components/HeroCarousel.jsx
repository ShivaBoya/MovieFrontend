import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, ChevronRight, ChevronLeft } from 'lucide-react';

const HeroCarousel = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        if (!movies || movies.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 8000); // Change every 8 seconds
        return () => clearInterval(timer);
    }, [movies]);

    if (!movies || movies.length === 0) return null;

    const currentMovie = movies[currentIndex];

    // Fallback logic for images (same as MovieCard)
    const backdropUrl = currentMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
        : (currentMovie.poster_path
            ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
            : currentMovie.poster); // Provide fallback if no backlight

    const title = currentMovie.title || currentMovie.name;
    const overview = currentMovie.overview || currentMovie.description || "No description available.";

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % movies.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);

    return (
        <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden shadow-2xl group">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear transform scale-105"
                        style={{ backgroundImage: `url(${backdropUrl})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Content Content */}
            <div className="absolute inset-0 flex items-center px-8 md:px-16 z-20">
                <div className="max-w-2xl space-y-6">
                    <motion.h1
                        key={`${currentIndex}-title`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-xl tracking-tight leading-none"
                    >
                        {title}
                    </motion.h1>

                    <motion.div
                        key={`${currentIndex}-meta`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 text-emerald-400 font-semibold"
                    >
                        <span className="bg-emerald-500/20 px-3 py-1 rounded-md border border-emerald-500/50">
                            {currentMovie.vote_average ? `${(currentMovie.vote_average * 10).toFixed(0)}% Match` : 'New'}
                        </span>
                        <span className="text-slate-300">
                            {currentMovie.release_date ? currentMovie.release_date.substring(0, 4) : '2024'}
                        </span>
                    </motion.div>

                    <motion.p
                        key={`${currentIndex}-desc`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-slate-300 line-clamp-3 font-medium drop-shadow-md"
                    >
                        {overview}
                    </motion.p>
                    {/* Action Buttons */}
                    <motion.div
                        key={`${currentIndex}-actions`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4 mt-8"
                    >
                        <button className="bg-white text-black px-6 md:px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all text-lg shadow-lg hover:scale-105 active:scale-95">
                            <Play fill="currentColor" size={24} />
                            Play
                        </button>
                        <button className="bg-slate-600/70 text-white px-6 md:px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-600/90 transition-all text-lg backdrop-blur-sm shadow-lg hover:scale-105 active:scale-95">
                            <Info size={24} />
                            More Info
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Navigation Arrows - Visible on Group Hover */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/60 rounded-full backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/10"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/60 rounded-full backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all z-30 border border-white/10"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 right-8 flex gap-2 z-30">
                {movies.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-slate-600 hover:bg-slate-400'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
