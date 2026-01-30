import React, { useState } from 'react';
import { Trash2, Edit, Play, Plus, ChevronDown, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, onDelete, onEdit, viewMode = 'grid' }) => {
    const { user } = useAuth();
    const isList = viewMode === 'list';
    const [isHovered, setIsHovered] = useState(false);

    // Hybrid Data Normalization
    const title = movie.name || movie.title;
    const genre = movie.genre || (movie.genre_ids ? 'Popular' : 'Unknown');
    const year = movie.releaseYear || (movie.release_date ? movie.release_date.substring(0, 4) : 'N/A');
    const rating = typeof movie.rating !== 'undefined' ? movie.rating : (movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A');

    // Prefer backdrop for landscape cards, fallback to poster
    const imageUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : (movie.poster || movie.Poster || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null));

    const matchScore = movie.vote_average ? Math.round(movie.vote_average * 10) : Math.floor(Math.random() * (99 - 70 + 1) + 70);

    // Detect mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const handleClick = () => {
        console.log(`Clicked on ${title}`);
    };

    // List View Render
    if (isList) {
        return (
            <div className="bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between p-4 px-6 hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-6">
                    {imageUrl && (
                        <img src={imageUrl} alt={title} className="w-24 h-16 object-cover rounded-md" />
                    )}
                    <div>
                        <h3 className="font-bold text-slate-50 text-lg mb-1">{title}</h3>
                        <p className="text-sm text-slate-400">{year} • {genre}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <span className="font-bold text-amber-400">⭐ {rating}</span>
                    <ActionButtons user={user} movie={movie} onEdit={onEdit} onDelete={onDelete} />
                </div>
            </div>
        );
    }

    // Grid View Render
    return (
        <motion.div
            className='relative bg-transparent rounded-lg cursor-pointer transition-all duration-300'
            style={{ width: '100%', height: '100%', perspective: '1000px' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            onClick={handleClick}
        >
            <motion.div
                className='w-full h-full relative rounded-md overflow-hidden bg-slate-900 border border-slate-800 shadow-xl'
                variants={{
                    rest: { scale: 1, zIndex: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
                    hover: {
                        scale: isMobile ? 1.05 : 1.4,
                        zIndex: 50,
                        y: isMobile ? 0 : -20,
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                        transition: { duration: 0.3, ease: 'easeOut' }
                    }
                }}
            >
                {/* Image */}
                <div className="aspect-video w-full bg-slate-800">
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">No Image</div>
                    )}
                </div>

                {/* Info Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-3 md:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <h3 className="text-white font-bold text-sm md:text-lg leading-tight mb-1 drop-shadow-md line-clamp-1">
                        {title}
                    </h3>

                    <div className="flex items-center gap-2 text-[10px] md:text-xs text-green-400 font-semibold mb-2">
                        <span>{matchScore}% Match</span>
                        <span className="text-slate-300">{year}</span>
                        <span className="border border-slate-500 px-1 rounded text-[0.6rem] text-slate-300 uppercase">HD</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                        <button className="bg-white text-black p-1.5 md:p-2 rounded-full hover:bg-slate-200 transition-colors">
                            <Play fill="black" size={isMobile ? 12 : 16} />
                        </button>
                        <button className="border-2 border-slate-400 text-white p-1 md:p-1.5 rounded-full hover:border-white transition-colors">
                            <Plus size={isMobile ? 12 : 16} />
                        </button>
                        <div className="ml-auto">
                            <button className="border border-slate-500 text-slate-300 p-1 rounded-full hover:border-white hover:text-white transition-colors">
                                <ChevronDown size={isMobile ? 14 : 18} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Extra Info */}
                    <div className="hidden md:block mt-2">
                        <div className="flex items-center gap-2 text-[10px] text-slate-300">
                            <span className="flex items-center gap-1"><Star size={10} fill="currentColor" className="text-yellow-500" /> {rating}</span>
                            <span>•</span>
                            <span className="truncate max-w-[100px]">{genre}</span>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    {user && !isMobile && (
                        <div className="absolute top-2 right-2">
                            <ActionButtons user={user} movie={movie} onEdit={onEdit} onDelete={onDelete} mini />
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const ActionButtons = ({ user, movie, onEdit, onDelete, mini = false }) => {
    if (!user) return null;
    return (
        <div className="flex gap-1 bg-black/50 backdrop-blur-sm rounded-full p-1">
            <button
                onClick={(e) => { e.stopPropagation(); onEdit(movie); }}
                className={`${mini ? 'p-1' : 'p-2'} rounded-full text-slate-400 hover:text-blue-400 transition-colors`}
                title="Edit"
            >
                <Edit size={mini ? 12 : 16} />
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(movie._id); }}
                className={`${mini ? 'p-1' : 'p-2'} rounded-full text-slate-400 hover:text-red-500 transition-colors`}
                title="Delete"
            >
                <Trash2 size={mini ? 12 : 16} />
            </button>
        </div>
    );
};

export default MovieCard;
