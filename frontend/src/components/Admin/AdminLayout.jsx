import React, { useState, useContext, useEffect } from "react"
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                toast.error("Access denied. Please login first.");
                navigate("/login");
            } else if (user.role !== "admin") {
                toast.error("Access denied. Admin privileges required.");
                navigate("/");
            }
        }
    }, [user, loading, navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!user || user.role !== "admin") return null;

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">
            {/* Mobile Toggle Button */}
            <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
                <button onClick={toggleSidebar}>
                    <FaBars size={24}/>
                </button>
                <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
            </div>
            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-10 bg-black/50 md:hidden" onClick={toggleSidebar}></div>
            )}
            {/* sidebar */}
            <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0 md:static md:block z-20` }>
                <AdminSidebar />
            </div>
            <div className="flex-grow p-6 overflow-auto bg-gray-50">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;