import React, { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [movieRefreshTrigger, setMovieRefreshTrigger] = useState(0);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
            closeLoginModal
        }}>
            {children}
        </UIContext.Provider>
    );
};
