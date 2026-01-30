import React, { useEffect, useState, useRef } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchPopular, fetchByGenre } from '../api';
import toast from 'react-hot-toast';
import MovieCard from '../components/MovieCard'; // Keep for MovieRow if needed, checking utilization
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

// Row Component for individual categories (Grid Layout)
const MovieRow = ({ title, fetchFn, genreId, onEdit, onDelete }) => {
    const [movies, setMovies] = useState([]);
    const { movieRefreshTrigger } = useUI(); // Global Refresh Listener

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
                    // Limit to 5 movies for a clean "one line" grid as requested
                    setMovies(data.results.slice(0, 5));
                }
            } catch (err) {
                console.error(`Error loading row ${title}:`, err);
            }
        };
        loadRow();
    }, [fetchFn, genreId, title, movieRefreshTrigger]); // Added trigger

    if (movies.length === 0) return null;

    return (
        <div className="mb-10 px-4 md:px-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2 border-l-4 border-red-600 pl-3">
                {title}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <div key={movie._id || movie.id} className="w-full aspect-video">
                        <MovieCard
                            movie={movie}
                            viewMode="grid"
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Home = () => {
    const [localMovies, setLocalMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]); // For Hero
    const [viewMode, setViewMode] = useState('grid');
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
        openDrawer(movie); // Opens MovieDrawer with data
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            try {
                await import('../api').then(module => module.deleteMovie(id));
                toast.success("Movie deleted successfully");
                triggerMovieRefresh(); // Reloads all rows
            } catch (err) {
                console.error("Delete failed", err);
                toast.error("Failed to delete movie");
            }
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white font-sans pb-20">

            {/* 1. Hero Section */}
            {popularMovies.length > 0 && <HeroCarousel movies={popularMovies.slice(0, 8)} />}

            {/* 2. TMDB Content Stacked Rows (Netflix Style) */}
            <div className="flex flex-col gap-2 mt-4">
                <MovieRow
                    title="Trending Now"
                    fetchFn={() => fetchPopular(1)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                <MovieRow title="Action Blockbusters" genreId={28} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow title="Laugh Out Loud Comedies" genreId={35} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow title="Spine Chilling Horror" genreId={27} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow title="Romantic Hits" genreId={10749} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow title="Family Favorites" genreId={10751} onEdit={handleEdit} onDelete={handleDelete} />
                <MovieRow title="Sci-Fi Adventures" genreId={878} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

        </div>
    );
};

export default Home;
