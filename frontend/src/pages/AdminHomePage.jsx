import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const AdminHomePage = () => {
    const { token } = useContext(AuthContext);
    const { fetchDashboardStats } = useContext(ProductContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStats = async () => {
            if (!token) return;
            try {
                const data = await fetchDashboardStats(token);
                setStats(data);
            } catch (error) {
                toast.error("Failed to load dashboard metrics");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getStats();
    }, [token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    if (!stats) return <p className="text-slate-500 text-center py-24 text-xs font-medium">Failed to load analytics</p>;

    return (
        <div className="clean-card p-6 sm:p-8 rounded-3xl">
            <h1 className="text-xl sm:text-2xl font-black mb-6 text-slate-950 uppercase font-heading tracking-tight">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Gross Revenue</h2>
                    <p className="text-2xl font-black text-emerald-700 mt-2">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Total Orders</h2>
                    <p className="text-2xl font-black text-slate-950 mt-2">{stats.totalOrders}</p>
                    <Link to="/admin/orders" className="text-xs font-bold text-slate-900 hover:underline mt-3 inline-block">
                        Manage Orders →
                    </Link>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Products</h2>
                    <p className="text-2xl font-black text-slate-950 mt-2">{stats.totalProducts}</p>
                    <Link to="/admin/products" className="text-xs font-bold text-slate-900 hover:underline mt-3 inline-block">
                        Manage Inventory →
                    </Link>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <h2 className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Users</h2>
                    <p className="text-2xl font-black text-slate-950 mt-2">{stats.totalUsers}</p>
                    <Link to="/admin/users" className="text-xs font-bold text-slate-900 hover:underline mt-3 inline-block">
                        Manage Users →
                    </Link>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-6">
                <h2 className="text-lg font-black mb-5 text-slate-950 uppercase font-heading tracking-tight">Recent Orders</h2>
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="min-w-full text-left text-slate-700">
                        <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 tracking-wider">
                            <tr>
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Total</th>
                                <th className="py-3 px-4">Payment</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {stats.recentOrders && stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50 transition border-b border-slate-100 last:border-0">
                                        <td className="p-3.5 font-bold text-slate-950 text-xs">
                                            <Link to={`/order/${order._id}`} className="hover:underline text-slate-900">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Link>
                                        </td>
                                        <td className="p-3.5 text-xs font-semibold text-slate-800">{order.user ? order.user.name : "Guest / Deleted"}</td>
                                        <td className="p-3.5 text-xs font-black text-slate-950">${order.totalPrice.toLocaleString()}</td>
                                        <td className="p-3.5">
                                            <span className={`${
                                                order.isPaid ? "badge-emerald" : "badge-amber"
                                            } px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="p-3.5">
                                            <span className={`${
                                                order.isDelivered ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-600 border border-slate-200"
                                            } px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                                {order.isDelivered ? "Delivered" : "Processing"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-400 font-medium text-xs">
                                        No recent transactions recorded.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
