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
    const lowerQuery = query.toLowerCase();
    const results = sampleMovies.filter(movie =>
        movie.name.toLowerCase().includes(lowerQuery) ||
        (movie.description && movie.description.toLowerCase().includes(lowerQuery))
    );
    return { results };
};

export const fetchPopular = async (page = 1) => {
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
        18: "Drama",
        80: "Crime",
        14: "Fantasy",
        10752: "War"
    };
    const genreName = genreMap[genreId];

    if (!genreName) return { results: [] };

    const filtered = sampleMovies.filter(m => m.genre === genreName);
    return { results: filtered };
};

export const getTrailer = async (movieId) => {
    try {
        const movie = sampleMovies.find(m => m._id === movieId);

        if (movie && movie.trailerUrl) {
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
    console.log("Update requested for", id, movieData);
    return movieData;
};

export const deleteMovie = async (id) => {
    console.log("Delete requested for", id);
    return { message: "Movie deleted" };
};

export default api;
