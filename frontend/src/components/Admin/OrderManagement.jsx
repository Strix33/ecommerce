import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
    const { fetchOrders, toggleDeliveryStatus } = useContext(ProductContext);
    const { token } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        if (!token) return;
        try {
            const data = await fetchOrders(token);
            setOrders(data);
        } catch (error) {
            toast.error("Failed to load orders list");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [token]);

    const handleDeliveryToggle = async (orderId) => {
        try {
            await toggleDeliveryStatus(orderId, token);
            toast.success("Order status updated successfully!");
            loadOrders();
        } catch (error) {
            toast.error(error.message || "Failed to update order status");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    return (
        <div className="clean-card p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl sm:text-2xl font-black mb-6 text-slate-950 tracking-tight uppercase font-heading">Orders Queue</h2>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full text-left text-slate-700">
                    <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-200 tracking-wider">
                        <tr>
                            <th className="py-3 px-4">Order ID</th>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4 text-center">Total</th>
                            <th className="py-3 px-4 text-center">Payment</th>
                            <th className="py-3 px-4 text-center">Fulfillment</th>
                            <th className="py-3 px-4 text-right">Fulfillment Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0 transition">
                                    <td className="py-3 px-4 font-bold text-slate-950 text-xs whitespace-nowrap">
                                        <Link to={`/order/${order._id}`} className="text-slate-900 hover:underline">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </Link>
                                    </td>
                                    <td className="p-3.5 text-xs font-semibold text-slate-800">{order.user ? order.user.name : "Guest / Deleted"}</td>
                                    <td className="p-3.5 text-center font-black text-slate-950 text-xs">${order.totalPrice.toLocaleString()}</td>
                                    <td className="p-3.5 text-center">
                                        <span className={`${order.isPaid ? "badge-emerald" : "badge-amber"} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                    <td className="p-3.5 text-center">
                                        <span className={`${order.isDelivered ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-600 border border-slate-200"} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                            {order.isDelivered ? "Delivered" : "Processing"}
                                        </span>
                                    </td>
                                    <td className="p-3.5 text-right">
                                        <button 
                                            onClick={() => handleDeliveryToggle(order._id)}
                                            className={`${
                                                order.isDelivered 
                                                    ? "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200" 
                                                    : "bg-slate-950 hover:bg-slate-800 text-white shadow-xs"
                                            } font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-colors`}
                                        >
                                            {order.isDelivered ? "Revert Processing" : "Dispatch Order"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-400 font-medium text-xs">
                                    No orders found in queue.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;


