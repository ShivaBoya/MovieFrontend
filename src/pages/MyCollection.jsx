import React, { useEffect, useState } from 'react';
import api from '../api';
import MovieCard from '../components/MovieCard';
import StatsOverview from '../components/StatsOverview';
import { EmptyState } from '../components/UIComponents';
import { Plus, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import toast from 'react-hot-toast';

const MyCollection = () => {
    const [localMovies, setLocalMovies] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const { user } = useAuth();
    const { openDrawer, movieRefreshTrigger } = useUI();

    // Fetch Local Data
    useEffect(() => {
        const loadData = async () => {
            try {
                const localRes = await api.get('/movies');
                setLocalMovies(localRes.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load collection");
            }
        };
        loadData();
    }, [movieRefreshTrigger]);

    const handleDelete = async (id) => {
        toast((t) => (
            <span className="flex items-center gap-4">
                Delete?
                <button
                    onClick={async () => {
                        toast.dismiss(t.id);
                        await api.delete(`/movies/${id}`);
                        const res = await api.get('/movies');
                        setLocalMovies(res.data);
                        toast.success('Deleted');
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >Yes</button>
                <button onClick={() => toast.dismiss(t.id)} className="bg-slate-700 text-white px-3 py-1 rounded text-sm">No</button>
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-transparent text-white font-sans pb-20 pt-24 px-4 md:px-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        My Collection
                    </h1>
                    <p className="text-slate-400 mt-2">Manage your personal movie library</p>
                </div>

                {user && (
                    <button
                        onClick={() => openDrawer()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1"
                    >
                        <Plus size={20} /> Add Movie
                    </button>
                )}
            </div>

            {/* Stats Overview (Genre Distribution) */}
            <StatsOverview movies={localMovies} />

            {/* Content Divider */}
            <div className="h-px bg-slate-800 my-8" />

            {/* Local Movies Grid */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">All Movies ({localMovies.length})</h2>
                <div className="flex bg-slate-800 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        <ListIcon size={18} />
                    </button>
                </div>
            </div>

            {localMovies.length === 0 ? (
                <EmptyState onAdd={() => openDrawer()} />
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
                    {localMovies.map(movie => (
                        <div key={movie._id} className={viewMode === 'grid' ? 'aspect-video w-full' : 'w-full'}>
                            <MovieCard movie={movie} onDelete={handleDelete} onEdit={openDrawer} viewMode={viewMode} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCollection;
