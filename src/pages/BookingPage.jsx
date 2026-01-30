import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { socket } from '../socket';
import toast from 'react-hot-toast';

const BookingPage = () => {
    const { showtimeId } = useParams();
    const [showtime, setShowtime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Showtime Details
        const fetchShowtime = async () => {
            try {
                const res = await axios.get(`/api/showtimes/${showtimeId}`);
                setShowtime(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to load showtime');
                setLoading(false);
            }
        };

        fetchShowtime();

        // Connect Socket
        socket.connect();
        socket.emit('join-showtime', showtimeId);

        socket.on('seat-locked', ({ seatId, userId }) => {
            toast(`${seatId} is being booked...`, { icon: '🔒' });
            // In a real app, update state to show seat as locked (e.g. gray pending)
            // For now we just notify.
        });

        return () => {
            socket.off('seat-locked');
            socket.disconnect();
        };
    }, [showtimeId]);

    const toggleSeat = (row, col) => {
        const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
        const isBooked = showtime.bookedSeats.includes(seatId);

        if (isBooked) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(prev => prev.filter(s => s !== seatId));
        } else {
            setSelectedSeats(prev => [...prev, seatId]);
            socket.emit('request-seat', { showtimeId, seatId });
        }
    };

    if (loading) return <div className="p-10 text-center text-white">Loading Cinema...</div>;
    if (!showtime) return <div className="p-10 text-center text-white">Showtime not found</div>;

    const { rows, columns } = showtime.theater.seatMap;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8 border-b border-slate-700 pb-4">
                    <h1 className="text-3xl font-bold">{showtime.movie.name}</h1>
                    <p className="text-slate-400">{showtime.theater.name} | {new Date(showtime.startTime).toLocaleString()}</p>
                </header>

                {/* Screen */}
                <div className="mb-12">
                    <div className="h-2 w-full bg-blue-500 shadow-[0_10px_30px_rgba(59,130,246,0.5)] rounded-full mb-4"></div>
                    <p className="text-center text-xs text-slate-500 uppercase tracking-widest">Screen</p>
                </div>

                {/* Seat Grid */}
                <div className="flex flex-col gap-4 items-center mb-12 overflow-x-auto">
                    {[...Array(rows)].map((_, i) => (
                        <div key={i} className="flex gap-3">
                            {[...Array(columns)].map((_, j) => {
                                const seatId = `${String.fromCharCode(65 + i)}${j + 1}`;
                                const isBooked = showtime.bookedSeats.includes(seatId);
                                const isSelected = selectedSeats.includes(seatId);

                                return (
                                    <button
                                        key={j}
                                        onClick={() => toggleSeat(i, j)}
                                        disabled={isBooked}
                                        className={`
                      w-8 h-8 md:w-10 md:h-10 rounded-t-lg transition-all text-xs font-medium
                      ${isBooked
                                                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                                : isSelected
                                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 transform -translate-y-1'
                                                    : 'bg-white/10 hover:bg-white/30 text-slate-300'
                                            }
                    `}
                                    >
                                        {seatId}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Summary Footer */}
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 fixed bottom-6 left-6 right-6 max-w-4xl mx-auto shadow-2xl z-50">
                    <div>
                        <p className="text-slate-400 text-sm">Selected Seats</p>
                        <p className="text-xl font-bold">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm">Total Price</p>
                        <p className="text-2xl font-bold text-green-400">Rs. {selectedSeats.length * showtime.price}</p>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={selectedSeats.length === 0}
                    >
                        Confirm Booking
                    </button>
                </div>

                {/* Spacer for fixed footer */}
                <div className="h-24"></div>
            </div>
        </div>
    );
};

export default BookingPage;
