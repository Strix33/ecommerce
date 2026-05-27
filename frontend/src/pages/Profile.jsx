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
                <p className="text-xl">Loading your profile...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    {/* Left Section */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white border border-gray-100">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
                        <p className="text-lg text-gray-600 mb-6">{user.email}</p>
                        <div className="mb-4">
                            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full uppercase">
                                Role: {user.role}
                            </span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                    {/* Right Section */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        <MyOrdersPage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;