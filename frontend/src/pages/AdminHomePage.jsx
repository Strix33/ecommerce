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
            <div className="flex justify-center items-center py-24 bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!stats) return <p className="text-gray-500 text-center py-24">Failed to load analytics</p>;

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white border border-gray-100 shadow-sm rounded-xl mt-4">
            <h1 className="text-3xl font-extrabold mb-8 text-gray-900 tracking-wide">ADMIN DASHBOARD</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="p-5 shadow-sm border border-gray-100 rounded-xl bg-gray-50 flex flex-col justify-between">
                    <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold">Revenue</h2>
                    <p className="text-3xl font-black text-green-600 mt-2">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="p-5 shadow-sm border border-gray-100 rounded-xl bg-gray-50 flex flex-col justify-between">
                    <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold">Total Orders</h2>
                    <p className="text-3xl font-black text-gray-900 mt-2">{stats.totalOrders}</p>
                    <Link to="/admin/orders" className="text-xs font-bold text-blue-500 hover:underline mt-4">
                        Manage Orders →
                    </Link>
                </div>
                <div className="p-5 shadow-sm border border-gray-100 rounded-xl bg-gray-50 flex flex-col justify-between">
                    <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold">Total Products</h2>
                    <p className="text-3xl font-black text-gray-900 mt-2">{stats.totalProducts}</p>
                    <Link to="/admin/products" className="text-xs font-bold text-blue-500 hover:underline mt-4">
                        Manage Products →
                    </Link>
                </div>
                <div className="p-5 shadow-sm border border-gray-100 rounded-xl bg-gray-50 flex flex-col justify-between">
                    <h2 className="text-sm uppercase tracking-wider text-gray-500 font-bold">Active Customers</h2>
                    <p className="text-3xl font-black text-gray-900 mt-2">{stats.totalUsers}</p>
                    <Link to="/admin/users" className="text-xs font-bold text-blue-500 hover:underline mt-4">
                        Manage Users →
                    </Link>
                </div>
            </div>

            <div className="mt-8 border-t pt-8">
                <h2 className="text-xl font-bold mb-6 text-gray-800 uppercase tracking-wide">Recent Orders</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-700 border-b">
                            <tr>
                                <th className="py-3.5 px-4">Order ID</th>
                                <th className="py-3.5 px-4">User</th>
                                <th className="py-3.5 px-4">Total Price</th>
                                <th className="py-3.5 px-4">Payment</th>
                                <th className="py-3.5 px-4">Delivery</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentOrders && stats.recentOrders.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <tr key={order._id} className="border-b hover:bg-gray-50 transition border-gray-50 last:border-0">
                                        <td className="p-4 font-bold text-gray-900 text-sm">
                                            <Link to={`/order/${order._id}`} className="hover:underline text-blue-500">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-sm font-semibold">{order.user ? order.user.name : "Deleted User"}</td>
                                        <td className="p-4 text-sm font-bold text-gray-900">${order.totalPrice.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`${
                                                order.isPaid ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                                            } px-2.5 py-0.5 rounded-full text-xs font-bold border`}>
                                                {order.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`${
                                                order.isDelivered ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-500 border-gray-200"
                                            } px-2.5 py-0.5 rounded-full text-xs font-bold border`}>
                                                {order.isDelivered ? "Delivered" : "Processing"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500 font-semibold text-sm">
                                        No recent orders found.
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