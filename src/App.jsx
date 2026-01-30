import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { UIProvider, useUI } from './context/UIContext';
import Home from './pages/Home';
import MyCollection from './pages/MyCollection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MovieDrawer from './components/MovieDrawer';
import LoginModal from './components/LoginModal';
import api from './api';
import toast from 'react-hot-toast';
import BookingPage from './pages/BookingPage.jsx';
import Profile from './pages/Profile';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const hideNavbarRoutes = ['/login', '/signup'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  // Use UI Context for Global Drawer and Login Modal
  const {
    isDrawerOpen, closeDrawer, editingMovie, triggerMovieRefresh,
    isLoginModalOpen, closeLoginModal
  } = useUI();

  const handleGlobalSubmit = async (data) => {
    try {
      if (editingMovie) {
        await api.put(`/movies/${editingMovie._id}`, data);
        toast.success('Movie updated successfully!');
      } else {
        await api.post('/movies', data);
        toast.success('Movie created successfully!');
        navigate('/collection'); // Navigate to collection after adding
      }
      triggerMovieRefresh(); // Notify Home to reload
      closeDrawer();
    } catch (err) {
      toast.error(editingMovie ? 'Failed to update' : 'Failed to create');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {showNavbar && <Footer />}

      {/* Global Movie Drawer */}
      <MovieDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        initialData={editingMovie}
        onSubmit={handleGlobalSubmit}
      />

      {/* Global Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </div>
  );
};

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking/:showtimeId" element={<BookingPage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UIProvider>
          <Router>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#334155',
                  color: '#fff',
                },
                className: 'dark:bg-slate-800 dark:text-white',
              }}
            />
          </Router>
        </UIProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
