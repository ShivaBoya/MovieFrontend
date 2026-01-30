import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

export const searchMovies = async (query) => {
    const response = await axios.get(`/api/search?title=${query}`, {
        withCredentials: true
    });
    return response.data;
};

const API_KEY = "523b0601cf02a41b72f23dfa536afaa0";

export const fetchPopular = async (page = 1) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    );
    const data = await res.json();
    return data;
};

export const fetchByGenre = async (genreId, page = 1) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    );
    return res.json();
};

export default api;
