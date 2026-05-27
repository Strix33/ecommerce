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
            loadOrders(); // Refresh list
        } catch (error) {
            toast.error(error.message || "Failed to update order status");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white border border-gray-100 shadow-sm rounded-xl mt-4">
            <h2 className="text-2xl font-extrabold mb-6 text-gray-900 tracking-wide uppercase">Order Management</h2>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
                <table className="min-w-full text-left text-gray-500">
                    <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-700 border-b">
                        <tr>
                            <th className="py-3.5 px-4">Order ID</th>
                            <th className="py-3.5 px-4">Customer</th>
                            <th className="py-3.5 px-4 text-center font-bold">Total Price</th>
                            <th className="py-3.5 px-4 text-center">Payment</th>
                            <th className="py-3.5 px-4 text-center">Delivery Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 border-b border-gray-50 last:border-0 transition">
                                    <td className="py-4 px-4 font-bold text-gray-900 text-sm whitespace-nowrap">
                                        <Link to={`/order/${order._id}`} className="text-blue-500 hover:underline">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </Link>
                                    </td>
                                    <td className="p-4 text-sm font-semibold">{order.user ? order.user.name : "Deleted User"}</td>
                                    <td className="p-4 text-center font-bold text-gray-900 text-sm">${order.totalPrice.toLocaleString()}</td>
                                    <td className="p-4 text-center">
                                        <span className={`${order.isPaid ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"} px-2.5 py-0.5 rounded-full text-xs font-bold border`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`${order.isDelivered ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-50 text-gray-500 border-gray-200"} px-2.5 py-0.5 rounded-full text-xs font-bold border`}>
                                            {order.isDelivered ? "Delivered" : "Processing"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleDeliveryToggle(order._id)}
                                            className={`${
                                                order.isDelivered 
                                                    ? "bg-amber-500 hover:bg-amber-600" 
                                                    : "bg-green-500 hover:bg-green-600"
                                            } text-white font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded transition shadow-sm`}
                                        >
                                            {order.isDelivered ? "Mark Processing" : "Mark Shipped"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500 font-semibold text-sm">
                                    No orders found in the database.
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
