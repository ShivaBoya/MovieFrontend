import React, { createContext, useContext, useState, useCallback } from 'react';
import { getTrailer } from '../api';
import toast from 'react-hot-toast';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [movieRefreshTrigger, setMovieRefreshTrigger] = useState(0);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [trailerVideo, setTrailerVideo] = useState(null);

    const openDrawer = (movie = null) => {
        setEditingMovie(movie);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setEditingMovie(null);
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const playTrailer = async (movieId) => {
        try {
            console.log("Attempting to play trailer for movie:", movieId); // Debug
            const data = await getTrailer(movieId);
            console.log("Trailer API response:", data); // Debug
            const video = data.results?.find(v => v.type === "Trailer" && v.site === "YouTube");

            if (video) {
                console.log("Found trailer:", video.key); // Debug
                setTrailerVideo(video.key);
            } else {
                console.warn("No trailer found for this movie");
                toast.error("Trailer not available");
            }
        } catch (error) {
            console.error("Trailer Error", error);
            toast.error("Failed to load trailer");
        }
    };

    const closeTrailer = () => setTrailerVideo(null);

    const triggerMovieRefresh = () => {
        setMovieRefreshTrigger(prev => prev + 1);
    };

    return (
        <UIContext.Provider value={{
            isDrawerOpen,
            openDrawer,
            closeDrawer,
            editingMovie,
            triggerMovieRefresh,
            movieRefreshTrigger,
            isLoginModalOpen,
            openLoginModal,
            closeLoginModal,
            trailerVideo,
            playTrailer,
            closeTrailer
        }}>
            {children}
        </UIContext.Provider>
    );
};
