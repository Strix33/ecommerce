import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
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

    // Guard route: redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            toast.error("Please login to proceed with checkout.");
            navigate("/login");
        }
    }, [user, loading, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-24 min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (cartItems.length === 0 && !createdOrder) {
        return (
            <div className="text-center py-24 min-h-screen text-gray-500 font-medium">
                Your cart is empty. Cannot checkout.
            </div>
        );
    }

    // Phase 1: Submit shipping details and create order in Database
    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        try {
            // Map cart state to backend OrderItems structure
            const orderItems = cartItems.map(item => ({
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                size: item.size,
                color: item.color,
                quantity: item.quantity
            }));

            const response = await fetch("http://localhost:9000/api/orders", {
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

    // Phase 2: Handle successful payment (mock or PayPal)
    const handlePaymentSuccess = async (details = {}) => {
        if (!createdOrder) return;
        setPaymentLoading(true);
        try {
            const response = await fetch(`http://localhost:9000/api/orders/${createdOrder._id}/pay`, {
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
            // Redirect to confirmation screen with order state
            navigate("/order-confirmation", { state: { order: data } });
        } catch (error) {
            toast.error(error.message || "Payment submission failed.");
            console.error("Payment logging error:", error);
        } finally {
            setPaymentLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto py-10 px-6 tracking-tighter bg-white rounded-xl border border-gray-50 shadow-sm mt-4">
            <div className="bg-white rounded-lg p-2">
                <h2 className="text-3xl font-bold uppercase mb-6 tracking-wide text-gray-900 border-b pb-2">Checkout</h2>
                
                <form onSubmit={handleCreateCheckout}>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">Contact Details</h3>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold mb-1 text-sm">Account Email</label>
                        <input
                            type="email"
                            value={user ? user.email : ""}
                            className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                            disabled
                        />
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wider">Delivery Address</h3>
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 font-semibold mb-1 text-sm">First Name</label>
                            <input
                                type="text"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                                className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold mb-1 text-sm">Last Name</label>
                            <input
                                type="text"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                                className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-1 text-sm">Address Line</label>
                        <input
                            type="text"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                            className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                            placeholder="Apartment, suite, unit, street number"
                            required
                            disabled={!!createdOrder}
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 font-semibold mb-1 text-sm">City</label>
                            <input
                                type="text"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                                className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold mb-1 text-sm">Postal Code</label>
                            <input
                                type="text"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                                className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-600 font-semibold mb-1 text-sm">Country</label>
                            <input
                                type="text"
                                value={shippingAddress.country}
                                onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                                className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-semibold mb-1 text-sm">Phone</label>
                            <input
                                type="tel"
                                value={shippingAddress.phone}
                                onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                                className="w-full p-2.5 border rounded-lg focus:ring-1 focus:ring-black"
                                required
                                disabled={!!createdOrder}
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        {!createdOrder ? (
                            <button 
                                type="submit" 
                                className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition tracking-wide shadow-sm"
                            >
                                Continue to Payment
                            </button>
                        ) : (
                            <div className="bg-gray-50 p-6 border rounded-xl border-dashed">
                                <h3 className="text-md font-bold mb-4 text-gray-800 uppercase tracking-wider">Payment Options</h3>
                                
                                <div className="space-y-4">
                                    {/* Mock instant check out option (very friendly for local test) */}
                                    <button
                                        type="button"
                                        onClick={() => handlePaymentSuccess()}
                                        disabled={paymentLoading}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-lg transition tracking-wide shadow-sm active:scale-[0.99] disabled:opacity-50"
                                    >
                                        {paymentLoading ? "Processing Mock Payment..." : "💳 Mock Payment (Instant Success)"}
                                    </button>

                                    {/* PayPal button (if client id is active) */}
                                    {import.meta.env.VITE_PAYPAL_CLIENT_ID && (
                                        <div>
                                            <div className="text-center text-xs text-gray-500 font-semibold my-2">— OR PAY WITH PAYPAL —</div>
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
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 h-fit">
                <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider border-b pb-2">Order Summary</h3>
                <div className="divide-y divide-gray-200 mb-6">
                    {cartItems.map((product, index) => (
                        <div key={index} className="flex items-start justify-between py-4">
                            <div className="flex items-start">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-20 h-24 object-cover mr-4 rounded border" 
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h4>
                                    <p className="text-xs text-gray-500 mt-0.5">Size: <span className="font-semibold">{product.size}</span></p>
                                    <p className="text-xs text-gray-500">Color: <span className="font-semibold">{product.color}</span></p>
                                    <p className="text-xs text-gray-500">Qty: <span className="font-semibold">{product.quantity}</span></p>
                                </div>
                            </div>
                            <p className="text-md font-bold text-gray-900">${(product.price * product.quantity).toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 font-semibold text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                        <p>Subtotal</p>
                        <p className="text-gray-900">${totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p>Shipping</p>
                        <p className="text-green-600 font-bold uppercase text-xs">Free</p>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t pt-4 mt-4">
                        <p>Total</p>
                        <p className="text-xl text-black">${totalPrice.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;