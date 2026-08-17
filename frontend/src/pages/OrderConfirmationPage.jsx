import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const order = location.state?.order;

    const calculateEstimatedDelivery = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 7);
        return orderDate.toLocaleDateString();
    };

    if (!order) {
        return (
            <div className="max-w-2xl mx-auto p-8 text-center clean-card rounded-3xl my-16 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-black uppercase font-heading text-slate-950 mb-2">Order Confirmation</h1>
                <p className="text-slate-500 mb-6 text-xs">No active purchase session found. View your order history below.</p>
                <Link to="/my-orders" className="bg-slate-950 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors">
                    View My Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 my-8">
            <div className="text-center mb-8">
                <span className="inline-block p-3 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 text-3xl mb-3">✓</span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-950 font-heading uppercase tracking-tight">
                    Order Confirmed!
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm font-medium mt-2 max-w-md mx-auto">
                    Your payment was successfully authorized. A receipt has been sent to your email.
                </p>
            </div>

            <div className="clean-card p-6 sm:p-10 rounded-3xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-slate-100 pb-5 gap-4">
                    <div>
                        <h2 className="text-base font-black text-slate-950">
                            Order #{order._id.toUpperCase()}
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <span className="text-slate-900 text-xs font-bold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl uppercase tracking-wider inline-block">
                            Est. Delivery: {calculateEstimatedDelivery(order.createdAt)}
                        </span>
                    </div>
                </div>

                {/* Ordered items */}
                <div className="mb-6 space-y-3">
                    <h4 className="font-bold text-slate-950 uppercase tracking-wider text-xs mb-2">Order Items</h4>
                    {order.orderItems && order.orderItems.map((item) => (
                        <div key={item._id || item.productId} className="flex items-center p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-14 h-16 object-cover rounded-xl mr-3.5 border border-slate-200"
                            />
                            <div>
                                <h4 className="font-bold text-slate-950 text-xs">{item.name}</h4>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                    Size: <span className="text-slate-900 font-semibold">{item.size}</span> | Color: {item.color}
                                </p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-slate-950 font-black text-xs">${(item.price * item.quantity).toLocaleString()}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">Qty: {item.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Payment & Shipping details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-950 mb-1.5 uppercase tracking-wider text-xs">Payment Method</h4>
                        <div className="space-y-0.5 text-xs text-slate-600 font-medium">
                          <p>Provider: <span className="text-slate-950 font-bold">{order.paymentMethod}</span></p>
                          <p>Status: <span className="text-emerald-700 font-bold">Paid</span></p>
                          <p className="text-[10px] text-slate-400 mt-1">Ref: {order.paymentResult?.id}</p>
                        </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-slate-950 mb-1.5 uppercase tracking-wider text-xs">Shipping Address</h4>
                        <div className="space-y-0.5 text-xs text-slate-600 font-medium">
                          <p className="text-slate-950 font-bold">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                          <p className="text-slate-600">{order.shippingAddress?.address}</p>
                          <p className="text-slate-600">{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                          <p className="text-slate-600">{order.shippingAddress?.country}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link 
                    to="/my-orders" 
                    className="bg-slate-950 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs"
                >
                    View My Orders
                </Link>
                <Link 
                    to="/" 
                    className="bg-white text-slate-950 hover:bg-slate-50 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider border border-slate-200 transition-colors shadow-xs"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
