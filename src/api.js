import axios from 'axios';
import { sampleMovies } from './data/sampleMovies';

const api = axios.create({
    baseURL: 'https://moviebackend-2q46.onrender.com/api',
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const searchMovies = async (query) => {
    // Search in local data
    const lowerQuery = query.toLowerCase();
    const results = sampleMovies.filter(movie =>
        movie.name.toLowerCase().includes(lowerQuery) ||
        (movie.description && movie.description.toLowerCase().includes(lowerQuery))
    );
    return { results };
};

// Backend API Replacement
export const fetchPopular = async (page = 1) => {
    // Return local data
    return { results: sampleMovies };
};

export const fetchByGenre = async (genreId, page = 1) => {
    const genreMap = {
        28: "Action",
        35: "Comedy",
        27: "Horror",
        10749: "Romance",
        10751: "Family",
        878: "Sci-Fi",
        53: "Thriller",
        16: "Animation",
        18: "Drama", // Added Drama
        80: "Crime", // Added Crime
        14: "Fantasy", // Added Fantasy
        10752: "War" // Added War
    };
    const genreName = genreMap[genreId];

    if (!genreName) return { results: [] };

    // Filter local data
    const filtered = sampleMovies.filter(m => m.genre === genreName);
    return { results: filtered };
};

export const getTrailer = async (movieId) => {
    try {
        // Find movie in local data
        const movie = sampleMovies.find(m => m._id === movieId);

        if (movie && movie.trailerUrl) {
            // Extract video ID from YouTube URL
            // Supports: https://www.youtube.com/embed/ID, https://www.youtube.com/watch?v=ID and https://youtu.be/ID
            let videoId = null;
            if (movie.trailerUrl.includes('embed/')) {
                videoId = movie.trailerUrl.split('embed/')[1];
            } else if (movie.trailerUrl.includes('v=')) {
                videoId = movie.trailerUrl.split('v=')[1].split('&')[0];
            } else if (movie.trailerUrl.includes('youtu.be/')) {
                videoId = movie.trailerUrl.split('youtu.be/')[1].split('?')[0];
            }

            if (videoId) {
                return { results: [{ key: videoId, type: "Trailer", site: "YouTube" }] };
            }
        }
        return { results: [] };
    } catch (err) {
        console.error("Error fetching trailer:", err);
        return { results: [] };
    }
};


export const updateMovie = async (id, movieData) => {
    // Mock update - in a real app this would call backend or update local state context
    console.log("Update requested for", id, movieData);
    return movieData;
};

export const deleteMovie = async (id) => {
    // Mock delete
    console.log("Delete requested for", id);
    // Note: This won't persist in a real app unless we use state/context for the source of truth
    // But for this session it mimics the API success
    return { message: "Movie deleted" };
};

export default api;
