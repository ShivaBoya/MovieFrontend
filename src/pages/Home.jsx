import React, { useEffect, useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import { motion } from 'framer-motion';
import { fetchPopular, fetchByGenre } from '../api';
import toast from 'react-hot-toast';
import MovieCard from '../components/MovieCard';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

// Row Component for individual categories (Grid Layout)
const MovieRow = ({ title, fetchFn, genreId, onEdit, onDelete, index }) => {
    const [movies, setMovies] = useState([]);
    const { movieRefreshTrigger } = useUI();

    useEffect(() => {
        const loadRow = async () => {
            try {
                let data;
                if (genreId) {
                    data = await fetchByGenre(genreId);
                } else if (fetchFn) {
                    data = await fetchFn();
                }
                if (data && data.results) {
                    setMovies(data.results);
                }
            } catch (err) {
                console.error(`Error loading row ${title}:`, err);
            }
        };
        loadRow();
    }, [fetchFn, genreId, title, movieRefreshTrigger]);

    if (movies.length === 0) return null;

    // 3D Stagger & Reveal Animation
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: index * 0.1 // Stagger rows
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -15, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="mb-12 px-4 md:px-10 perspective-1000"
        >
            <motion.h3
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
                    {title}
                </span>
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {movies.map((movie) => (
                    <motion.div
                        key={movie._id || movie.id}
                        variants={itemVariants}
                        whileHover={{ y: -10, zIndex: 10, transition: { duration: 0.2 } }}
                        className="w-full aspect-video"
                    >
                        <MovieCard
                            movie={movie}
                            viewMode="grid"
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]); // For Hero
    const { user } = useAuth();
    const { openDrawer, triggerMovieRefresh } = useUI();

    // Initial Load (Hero Data Only)
    useEffect(() => {
        const loadData = async () => {
            try {
                const popularRes = await fetchPopular(1);
                if (popularRes.results) {
                    setPopularMovies(popularRes.results);
                }
            } catch (err) {
                console.error(err);
            }
        };
        loadData();
    }, []);

    // Handlers
    const handleEdit = (movie) => {
        openDrawer(movie);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                await import('../api').then(module => module.deleteMovie(id));
                toast.success("Movie deleted successfully");
                triggerMovieRefresh();
            } catch (err) {
                console.error("Delete failed", err);
                toast.error("Failed to delete movie");
            }
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white font-sans pb-20 overflow-x-hidden">

            {/* 1. Hero Section with 3D Entrance */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                {popularMovies.length > 0 && <HeroCarousel movies={popularMovies.slice(0, 8)} />}
            </motion.div>

            {/* 2. Content Stacked Rows with 3D Animations */}
            <div className="flex flex-col gap-4 mt-8 relative z-20 container mx-auto transform-gpu">
                <MovieRow index={0} title="All Movies" fetchFn={() => fetchPopular(1)} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={1} title="Action Blockbusters" genreId={28} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={2} title="Laugh Out Loud Comedies" genreId={35} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={3} title="Spine Chilling Horror" genreId={27} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={4} title="Dramatic Masterpieces" genreId={18} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={5} title="Crime Thrillers" genreId={80} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={6} title="Edge of Seat Thrillers" genreId={53} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={7} title="Romantic Hits" genreId={10749} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={8} title="Family Favorites" genreId={10751} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={9} title="Animation World" genreId={16} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={10} title="Sci-Fi Adventures" genreId={878} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow index={11} title="Fantasy Realms" genreId={14} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

        </div>
    );
};

export default Home;
