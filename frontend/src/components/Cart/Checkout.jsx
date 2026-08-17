import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { API_URL } from "../../config";
import { toast } from "sonner";
import PayPalButton from "./PayPalButton";

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, totalPrice, clearCart } = useContext(CartContext);
    const { user, token, loading } = useContext(AuthContext);

    const [createdOrder, setCreatedOrder] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    useEffect(() => {
        if (!loading && !user) {
            toast.error("Please login to proceed with checkout.");
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
            </div>
        );
    }

    if (cartItems.length === 0 && !createdOrder) {
        return (
            <div className="text-center py-24 min-h-screen text-slate-500 font-medium">
                Your cart is empty. Cannot checkout.
            </div>
        );
    }

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        try {
            const orderItems = cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                size: item.size,
                color: item.color,
                quantity: item.quantity
            }));

            const response = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderItems,
                    shippingAddress,
                    paymentMethod: "Credit Card / PayPal",
                    totalPrice
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create order");
            }

            setCreatedOrder(data);
            toast.success("Shipping details verified! Proceed to payment.");
        } catch (error) {
            toast.error(error.message || "Error creating order. Please try again.");
            console.error("Checkout creation error:", error);
        }
    };

    const handlePaymentSuccess = async (details = {}) => {
        if (!createdOrder) return;
        setPaymentLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/orders/${createdOrder._id}/pay`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: details.id || `MOCK_TXN_${Date.now()}`,
                    status: details.status || "COMPLETED",
                    email_address: details.email_address || user.email
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Payment update failed");
            }

            toast.success("Payment processed successfully!");
            clearCart();
            navigate("/order-confirmation", { state: { order: data } });
        } catch (error) {
            toast.error(error.message || "Payment submission failed.");
            console.error("Payment logging error:", error);
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="clean-card p-6 sm:p-8 rounded-3xl">
                    <h2 className="text-xl sm:text-2xl font-black uppercase font-heading tracking-tight text-slate-950 border-b border-slate-100 pb-3.5 mb-5">
                        Express Checkout
                    </h2>
                    
                    <form onSubmit={handleCreateCheckout}>
                        <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">1. Account Email</h3>
                        <div className="mb-5">
                            <input
                                type="email"
                                value={user ? user.email : ""}
                                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-600 text-xs font-semibold cursor-not-allowed"
                                disabled
                            />
                        </div>

                        <h3 className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-wider">2. Shipping Address</h3>
                        <div className="mb-3.5 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-600 font-medium mb-1 text-[11px]">First Name</label>
                                <input
                                    type="text"
                                    value={shippingAddress.firstName}
                                    onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                    required
                                    disabled={!!createdOrder}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-1 text-[11px]">Last Name</label>
                                <input
                                    type="text"
                                    value={shippingAddress.lastName}
                                    onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                    required
                                    disabled={!!createdOrder}
                                />
                            </div>
                        </div>

                        <div className="mb-3.5">
                            <label className="block text-slate-600 font-medium mb-1 text-[11px]">Address</label>
                            <input
                                type="text"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                placeholder="Street address or suite"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>

                        <div className="mb-3.5 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-600 font-medium mb-1 text-[11px]">City</label>
                                <input
                                    type="text"
                                    value={shippingAddress.city}
                                    onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                    required
                                    disabled={!!createdOrder}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-1 text-[11px]">Postal Code</label>
                                <input
                                    type="text"
                                    value={shippingAddress.postalCode}
                                    onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                    required
                                    disabled={!!createdOrder}
                                />
                            </div>
                        </div>

                        <div className="mb-3.5 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-slate-600 font-medium mb-1 text-[11px]">Country</label>
                                <input
                                    type="text"
                                    value={shippingAddress.country}
                                    onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                    required
                                    disabled={!!createdOrder}
                                />
                            </div>
                            <div>
                                <label className="block text-slate-600 font-medium mb-1 text-[11px]">Phone</label>
                                <input
                                    type="tel"
                                    value={shippingAddress.phone}
                                    onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:border-slate-950 focus:outline-none"
                                    required
                                    disabled={!!createdOrder}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            {!createdOrder ? (
                                <button 
                                    type="submit" 
                                    className="w-full bg-slate-950 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-xs"
                                >
                                    Verify Address & Proceed
                                </button>
                            ) : (
                                <div className="p-5 border border-emerald-200 bg-emerald-50 rounded-2xl">
                                    <h3 className="text-xs font-bold text-emerald-800 mb-3 uppercase tracking-wider">3. Complete Payment</h3>
                                    
                                    <div className="space-y-3">
                                        <button
                                            type="button"
                                            onClick={() => handlePaymentSuccess()}
                                            disabled={paymentLoading}
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-xs disabled:opacity-50"
                                        >
                                            {paymentLoading ? "Processing Payment..." : "Instant Payment (Mock Order)"}
                                        </button>

                                        {import.meta.env.VITE_PAYPAL_CLIENT_ID && (
                                            <div>
                                                <div className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider my-2.5">— OR PAY WITH PAYPAL —</div>
                                                <PayPalButton 
                                                    amount={totalPrice} 
                                                    onSuccess={handlePaymentSuccess} 
                                                    onError={(err) => toast.error("PayPal transaction failed. Please use Mock checkout.")}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Right Order Summary Column */}
                <div className="clean-card p-6 sm:p-8 rounded-3xl h-fit">
                    <h3 className="text-base font-black uppercase font-heading tracking-tight text-slate-950 mb-5 border-b border-slate-100 pb-3.5">Order Summary</h3>
                    <div className="space-y-3 mb-5 max-h-80 overflow-y-auto pr-1">
                        {cartItems.map((product, index) => (
                            <div key={index} className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                                <div className="flex items-start">
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-14 h-16 object-cover mr-3 rounded-lg border border-slate-200" 
                                    />
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{product.name}</h4>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Size: <span className="text-slate-900 font-semibold">{product.size}</span></p>
                                        <p className="text-[10px] text-slate-500">Color: <span className="text-slate-900 font-semibold">{product.color}</span></p>
                                        <p className="text-[10px] text-slate-500">Qty: <span className="text-slate-900 font-semibold">{product.quantity}</span></p>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-slate-950">${(product.price * product.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                        <div className="flex justify-between items-center">
                            <p>Items Subtotal</p>
                            <p className="text-slate-950 font-bold">${totalPrice.toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Shipping</p>
                            <p className="text-emerald-700 font-bold uppercase text-[10px]">FREE EXPRESS</p>
                        </div>
                        <div className="flex justify-between items-center text-sm font-black text-slate-950 border-t border-slate-100 pt-3 mt-1">
                            <p className="uppercase font-heading">Total Payable</p>
                            <p className="text-lg font-black text-slate-950">${totalPrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
