import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';
import { toast } from 'sonner';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyOrders = async () => {
            if (!token) return;
            try {
                const response = await fetch(`${API_URL}/api/orders/my-orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                } else {
                    toast.error(data.message || "Failed to load orders");
                }
            } catch (error) {
                console.error("Error fetching personal orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [token]);

    const handleRowClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12 clean-card rounded-3xl p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    return (
        <div className="clean-card rounded-3xl p-6">
            <h2 className="text-lg sm:text-xl font-black mb-5 text-slate-950 uppercase font-heading tracking-tight">Order History</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className='min-w-full text-left text-slate-700'>
                    <thead className='bg-slate-50 text-[10px] uppercase text-slate-500 font-bold tracking-wider border-b border-slate-200'>
                        <tr>
                            <th className='py-3 px-3.5'>Item</th>
                            <th className='py-3 px-3.5'>Order ID</th>
                            <th className='py-3 px-3.5'>Date</th>
                            <th className='py-3 px-3.5'>Destination</th>
                            <th className='py-3 px-3.5'>Items</th>
                            <th className='py-3 px-3.5'>Total</th>
                            <th className='py-3 px-3.5'>Payment</th>
                            <th className='py-3 px-3.5'>Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} onClick={() => handleRowClick(order._id)} className='hover:bg-slate-50 cursor-pointer transition border-b border-slate-100 last:border-0'>
                                    <td className='py-2.5 px-3.5'>
                                        <img 
                                            src={order.orderItems && order.orderItems.length > 0 ? order.orderItems[0].image : "https://picsum.photos/150?random=1"} 
                                            alt={order.orderItems && order.orderItems.length > 0 ? order.orderItems[0].name : "Product"}
                                            className='w-10 h-12 object-cover rounded-lg border border-slate-200'
                                        />
                                    </td>
                                    <td className="py-2.5 px-3.5 font-bold text-slate-950 text-xs whitespace-nowrap">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className='py-2.5 px-3.5 text-xs text-slate-500'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-2.5 px-3.5 text-xs text-slate-600">
                                        {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                                    </td>
                                    <td className="py-2.5 px-3.5 font-bold text-xs text-slate-800">
                                        {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </td>
                                    <td className="py-2.5 px-3.5 font-black text-slate-950 text-xs">
                                        ${order.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="py-2.5 px-3.5">
                                        <span className={`${order.isPaid ? "badge-emerald" 
                                            : "badge-amber"} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                    <td className="py-2.5 px-3.5">
                                        <span className={`${order.isDelivered ? "bg-blue-50 text-blue-700 border border-blue-200" 
                                            : "bg-slate-100 text-slate-600 border border-slate-200"} px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}>
                                            {order.isDelivered ? "Delivered" : "Processing"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className='py-12 text-center text-slate-400 font-medium text-xs'>
                                    You have no order history yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrdersPage;
