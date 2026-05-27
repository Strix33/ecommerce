import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
                const response = await fetch("http://localhost:9000/api/orders/my-orders", {
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
            <div className="flex justify-center items-center py-10 bg-white rounded-lg shadow-sm border p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 uppercase tracking-wide">My Orders</h2>
            <div className="relative rounded-lg overflow-x-auto border border-gray-100">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-50 text-xs uppercase text-gray-700 font-bold border-b border-gray-100'>
                        <tr>
                            <th className='py-3.5 px-4'>Image</th>
                            <th className='py-3.5 px-4'>Order ID</th>
                            <th className='py-3.5 px-4'>Created</th>
                            <th className='py-3.5 px-4'>Shipping Address</th>
                            <th className='py-3.5 px-4'>Items</th>
                            <th className='py-3.5 px-4'>Total Price</th>
                            <th className='py-3.5 px-4'>Payment Status</th>
                            <th className='py-3.5 px-4'>Delivery</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} onClick={() => handleRowClick(order._id)} className='hover:bg-gray-50 cursor-pointer transition border-b border-gray-50 last:border-0'>
                                    <td className='py-3 px-4'>
                                        <img 
                                            src={order.orderItems && order.orderItems.length > 0 ? order.orderItems[0].image : "https://picsum.photos/150?random=1"} 
                                            alt={order.orderItems && order.orderItems.length > 0 ? order.orderItems[0].name : "Product"}
                                            className='w-11 h-11 object-cover rounded shadow-sm border'
                                        />
                                    </td>
                                    <td className="py-3 px-4 font-bold text-gray-900 whitespace-nowrap text-sm">
                                        #{order._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className='py-3 px-4 text-xs font-semibold'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 text-sm">
                                        {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                                    </td>
                                    <td className="py-3 px-4 font-semibold text-sm">
                                        {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}
                                    </td>
                                    <td className="py-3 px-4 font-bold text-gray-900 text-sm">
                                        ${order.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`${order.isPaid ? "bg-green-50 text-green-700 border-green-200" 
                                            : "bg-amber-50 text-amber-700 border-amber-200"} px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider`}>
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`${order.isDelivered ? "bg-blue-50 text-blue-700 border-blue-200" 
                                            : "bg-gray-50 text-gray-500 border-gray-200"} px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wider`}>
                                            {order.isDelivered ? "Delivered" : "Processing"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className='py-12 text-center text-gray-500 font-semibold text-sm'>
                                    You have no orders yet.
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