import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    const [isEditing, setIsEditing] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    });
    const { updateProfile } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password && formData.password !== formData.confirmPassword) {
                toast.error("Passwords don't match!");
                return;
            }
            // Only send password if it's not empty
            const dataToSend = {
                username: formData.username,
                email: formData.email
            };
            if (formData.password) dataToSend.password = formData.password;

            await updateProfile(dataToSend);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update profile');
        }
    };

    if (!user) {
        return <div className="p-8 text-white text-center">Please log in to view profile.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-6 md:p-12 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                        My Profile
                    </h1>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
                    >
                        <User size={18} />
                        Edit Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* User Card */}
                    <div className="md:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg shadow-blue-500/30">
                            {user.username?.[0]?.toUpperCase()}
                        </div>
                        <h2 className="text-xl font-bold mb-1">{user.username}</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{user.email}</p>

                        <div className="w-full space-y-2">
                            <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                                <User size={18} className="text-blue-500" />
                                <span>Member since {new Date().getFullYear()}</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-sm">
                                <Shield size={18} className="text-emerald-500" />
                                <span>Verified Account</span>
                            </div>
                        </div>
                    </div>

                    {/* Details / History */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Mail size={20} className="text-violet-500" />
                                Contact Info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Email</label>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Username</label>
                                    <p className="font-medium">{user.username}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2">My Bookings</h3>
                                <p className="text-slate-400 text-sm mb-4">You haven't made any bookings yet.</p>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                                    Browse Movies
                                </button>
                            </div>
                            {/* Decorative bg element */}
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Change Password (Optional)</label>
                                <div className="space-y-3">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 px-4 py-2 rounded-lg font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
