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
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    if (!user || user.role !== "admin") return null;

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative bg-slate-50 text-slate-900">
            {/* Mobile Toggle Button */}
            <div className="flex md:hidden p-4 bg-slate-950 border-b border-slate-800 text-white z-20 items-center justify-between">
                <div className="flex items-center">
                    <button onClick={toggleSidebar} className="p-2 text-slate-300">
                        <FaBars size={20}/>
                    </button>
                    <h1 className="ml-3 text-base font-black uppercase font-heading text-white">HYPEWEAR Admin</h1>
                </div>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-10 bg-slate-900/40 backdrop-blur-xs md:hidden" onClick={toggleSidebar}></div>
            )}

            {/* Sidebar */}
            <div className={`bg-slate-950 border-r border-slate-800 w-64 min-h-screen text-white fixed md:relative transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0 md:static md:block z-30` }>
                <AdminSidebar />
            </div>

            {/* Main content area */}
            <div className="flex-grow p-4 sm:p-8 overflow-auto bg-slate-50">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout;
