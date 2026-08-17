import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import MyOrdersPage from './MyOrdersPage';
import { toast } from 'sonner';

const Profile = () => {
    const { user, loading, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            toast.error("Please login to view your profile.");
            navigate("/login");
        }
    }, [user, loading, navigate]);

    const handleLogout = () => {
        logout();
        toast.success("Successfully logged out.");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-[85vh] flex flex-col py-8">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Profile Section */}
                    <div className="w-full lg:w-1/3 clean-card rounded-3xl p-6 sm:p-8 h-fit">
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-2xl mb-4">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h1 className="text-xl font-black uppercase text-slate-950 font-heading tracking-tight mb-1">{user.name}</h1>
                        <p className="text-xs text-slate-500 mb-4">{user.email}</p>
                        
                        <div className="mb-6 inline-block">
                            <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                ROLE: {user.role}
                            </span>
                        </div>
                        
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>

                    {/* Right Orders Section */}
                    <div className="w-full lg:w-2/3">
                        <MyOrdersPage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
