import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const order = location.state?.order;

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 7); // Standard 7 day shipping
        return orderDate.toLocaleDateString();
    };

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto p-12 text-center bg-white min-h-[50vh] flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Order Confirmation</h1>
                <p className="text-gray-500 mb-8 font-semibold">No active purchase session found. Check your order logs below.</p>
                <Link to="/my-orders" className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                    View My Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white mt-4">
            <div className="text-center mb-8">
                <span className="text-5xl">🎉</span>
                <h1 className="text-4xl font-extrabold text-green-600 mt-3">
                    Thank You for Your Order!
                </h1>
                <p className="text-gray-500 font-semibold mt-2">
                    Your payment was successfully processed. An confirmation has been sent to your email.
                </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white">
                <div className="flex flex-col sm:flex-row justify-between mb-8 border-b pb-4 gap-2">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Order ID: #{order._id.toUpperCase()}
                        </h2>
                        <p className="text-sm text-gray-400 font-medium">
                            Placed: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-green-600 text-sm font-bold bg-green-50 border border-green-200 px-3 py-1 rounded-full uppercase tracking-wider">
                            Estimated Delivery: {calculateEstimatedDelivery(order.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Ordered items */}
                <div className="mb-8 divide-y divide-gray-100">
                    <h4 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-xs">Ordered Items</h4>
                    {order.orderItems && order.orderItems.map((item) => (
                        <div key={item._id || item.productId} className="flex items-center py-4">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-16 h-20 object-cover rounded-lg mr-4 border"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                <p className="text-xs text-gray-500 font-semibold mt-0.5">
                                    Size: <span className="uppercase">{item.size}</span> | Color: {item.color}
                                </p>
                            </div>
                            <div className="ml-auto text-right font-bold">
                                <p className="text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                                <p className="text-xs text-gray-500 font-normal mt-0.5">Qty: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment & Shipping details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6 bg-white">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2 uppercase tracking-wide text-xs">Payment Information</h4>
                        <div className="space-y-1 text-sm text-gray-600 font-semibold">
                          <p>Method: <span className="text-gray-900">{order.paymentMethod}</span></p>
                          <p>Status: <span className="text-green-600">Paid</span></p>
                          <p className="text-[11px] text-gray-400 font-normal">Transaction Ref: {order.paymentResult?.id}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2 uppercase tracking-wide text-xs">Delivery Address</h4>
                        <div className="space-y-1 text-sm text-gray-600 font-semibold">
                          <p className="text-gray-900">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                          <p className="text-gray-500 font-medium">{order.shippingAddress?.address}</p>
                          <p className="text-gray-500 font-medium">{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                          <p className="text-gray-500 font-medium">{order.shippingAddress?.country}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12 flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                    to="/my-orders" 
                    className="bg-black hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-lg text-sm transition active:scale-95 shadow-sm"
                >
                    View My Orders
                </Link>
                <Link 
                    to="/" 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-lg text-sm transition active:scale-95 border"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;