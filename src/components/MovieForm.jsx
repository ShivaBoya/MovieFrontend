import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { searchMovies } from '../api';

const MovieForm = ({ onSubmit, initialData, onClose, isDrawer = false }) => {
    const [formData, setFormData] = useState({
        name: '',
        genre: '',
        releaseYear: new Date().getFullYear(),
        rating: 5,
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 2) {
                setIsSearching(true);
                try {
                    const data = await searchMovies(searchQuery);
                    setSearchResults(data.Search || []);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    // ManualSelect/SelectMovie remains same
    const selectMovie = (movie) => {
        setFormData({
            name: movie.Title,
            genre: movie.Type === 'movie' ? 'Movie' : movie.Type,
            releaseYear: parseInt(movie.Year) || new Date().getFullYear(),
            rating: 5,
            description: 'No description available', // OMDb search results don't have plot, need full fetch if we want it
            poster: movie.Poster !== 'N/A' ? movie.Poster : ''
        });
        setSearchResults([]);
        setSearchQuery(movie.Title); // Update input to show selected
    };

    // ...

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const formContent = (
        <>
            {!isDrawer && (
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">{initialData ? 'Edit Movie' : 'Add New Movie'}</h2>
                    <button className="text-slate-400 hover:text-white" onClick={onClose}><X /></button>
                </div>
            )}

            {/* Search Bar - Only show when adding new movie */}
            {!initialData && (
                <div className="mb-6 relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search OMDb (Type 3+ characters)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 p-3 pl-10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
                        />
                        <div className="absolute left-3 top-3.5 text-slate-400">
                            {isSearching ? <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div> : <Search size={20} />}
                        </div>
                    </div>

                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-700 rounded-lg mt-2 max-h-60 overflow-y-auto z-10 shadow-xl">
                            {searchResults.map((movie) => (
                                <div
                                    key={movie.imdbID}
                                    className="p-3 hover:bg-slate-700 cursor-pointer flex gap-3 items-center border-b border-slate-700/50"
                                    onClick={() => selectMovie(movie)}
                                >
                                    {movie.Poster !== 'N/A' && <img src={movie.Poster} alt={movie.Title} className="w-8 h-12 object-cover rounded" />}
                                    <div>
                                        <h4 className="font-bold text-sm text-white">{movie.Title}</h4>
                                        <p className="text-xs text-slate-400">{movie.Year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Movie Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Inception"
                        className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Sci-Fi"
                        className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[100px]"
                        placeholder="Movie plot summary..."
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Movie Poster</label>
                    <div className="flex flex-col gap-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData(prev => ({ ...prev, poster: reader.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
                        />
                        {/* URL Fallback or Preview */}
                        <div className="text-xs text-slate-500 text-center">- OR -</div>
                        <input
                            type="url"
                            name="poster"
                            value={formData.poster || ''}
                            onChange={handleChange}
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                            placeholder="Paste Image URL"
                        />
                        {formData.poster && (
                            <img src={formData.poster} alt="Preview" className="h-40 object-contain rounded-lg border border-slate-700 bg-black/50" />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Trailer URL (YouTube)</label>
                    <input
                        type="url"
                        name="trailer"
                        value={formData.trailer || ''}
                        onChange={handleChange}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-400">Release Year</label>
                        <input
                            type="number"
                            name="releaseYear"
                            value={formData.releaseYear}
                            onChange={handleChange}
                            required
                            min="1900"
                            max="2100"
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-400">Rating (0-10)</label>
                        <input
                            type="number"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                            min="0"
                            max="10"
                            step="0.1"
                            className="bg-slate-950 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-4 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                >
                    {initialData ? 'Update Movie' : 'Add Movie'}
                </button>
            </form>
        </>
    );

    if (isDrawer) {
        return <div className="h-full flex flex-col">{formContent}</div>;
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 p-8 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl relative">
                {formContent}
            </div>
        </div>
    );
};

export default MovieForm;
