import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const StatsOverview = ({ movies }) => {
    const stats = useMemo(() => {
        const totalMovies = movies.length;
        const avgRating = totalMovies > 0
            ? (movies.reduce((acc, m) => acc + m.rating, 0) / totalMovies).toFixed(1)
            : 0;

        const genreCounts = movies.reduce((acc, m) => {
            acc[m.genre] = (acc[m.genre] || 0) + 1;
            return acc;
        }, {});

        const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        const chartData = Object.keys(genreCounts).map(genre => ({
            name: genre,
            count: genreCounts[genre]
        }));

        return { totalMovies, avgRating, topGenre, chartData };
    }, [movies]);

    return (
        <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-white">
                <motion.div
                    className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.82 2H4.18C2.97 2 2 2.97 2 4.18v15.64C2 21.03 2.97 22 4.18 22h15.64c1.21 0 2.18-.97 2.18-2.18V4.18C22 2.97 21.03 2 19.82 2zM6 16.5l2.5-3.5 1.5 1.5 3.5-4.5 4.5 6H6z" />
                        </svg>
                    </div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Movies</h3>
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                        {stats.totalMovies}
                    </p>
                </motion.div>

                <motion.div
                    className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Rating</h3>
                    <p className="text-4xl font-extrabold text-amber-400 flex items-center gap-2">
                        {stats.avgRating} <span className="text-lg text-slate-500 font-normal">/ 10</span>
                    </p>
                </motion.div>

                <motion.div
                    className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Top Genre</h3>
                    <p className="text-3xl font-extrabold text-slate-100 truncate">
                        {stats.topGenre}
                    </p>
                </motion.div>
            </div>

            <motion.div
                className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-lg font-bold text-slate-200 mb-6">Genre Distribution</h3>
                <div style={{ width: '100%', height: 320 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                cursor={{ fill: '#334155', opacity: 0.4 }}
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={60}>
                                {stats.chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'][index % 4]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default StatsOverview;
