import axios from 'axios';

const api = axios.create({
    baseURL: 'https://moviebackend-2q46.onrender.com/api',
    withCredentials: true,
});

// ... (Interceptor remains same)

export const searchMovies = async (query) => {
    const response = await api.get(`/search?title=${query}`);
    return response.data;
};

// Backend API
export const fetchPopular = async (page = 1) => {
    // Fetch from our local DB (seeded data)
    const response = await api.get('/movies');
    // Sort or filter if needed, for "Popular" we can just return the first 20 or sorted by rating
    // Since our backend returns an array, we wrap it in { results: ... } to match UI expectation
    return { results: response.data.slice(0, 20) };
};

export const fetchByGenre = async (genreId, page = 1) => {
    // For now, fetch all and filter client-side or implement backend filtering
    // Since we only have 80 movies, fetching all is fine
    const response = await api.get('/movies');
    const genreMap = {
        28: "Action",
        35: "Comedy",
        27: "Horror",
        10749: "Romance",
        10751: "Family",
        878: "Sci-Fi",
        53: "Thriller",
        16: "Animation"
    };
    const genreName = genreMap[genreId];

    if (!genreName) return { results: [] };

    const filtered = response.data.filter(m => m.genre === genreName);
    return { results: filtered };
};

export const getTrailer = async (movieId) => {
    try {
        // Fetch the specific movie from our backend
        const response = await api.get(`/movies/${movieId}`);
        const movie = response.data;

        if (movie && movie.trailer) {
            // Extract video ID from YouTube URL
            // Supports: https://www.youtube.com/watch?v=ID and https://youtu.be/ID
            let videoId = null;
            if (movie.trailer.includes('v=')) {
                videoId = movie.trailer.split('v=')[1].split('&')[0];
            } else if (movie.trailer.includes('youtu.be/')) {
                videoId = movie.trailer.split('youtu.be/')[1].split('?')[0];
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
    const response = await api.put(`/movies/${id}`, movieData);
    return response.data;
};

export const deleteMovie = async (id) => {
    const response = await api.delete(`/movies/${id}`);
    return response.data;
};

export default api;
