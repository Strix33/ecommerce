import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";
import { toast } from "sonner";

const OrdersDetailsPage = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${API_URL}/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setOrderDetails(data);
        } else {
          toast.error(data.message || "Failed to load order details");
          navigate("/my-orders");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, token, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-950"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="text-center py-24 min-h-screen text-slate-500 font-medium">
        Order not found or loading failed.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 my-6">
      <h2 className="text-xl sm:text-2xl font-black mb-5 text-slate-950 uppercase font-heading tracking-tight">Order Receipt & Details</h2>
      
      <div className="clean-card p-6 sm:p-8 rounded-3xl">
        <div className="flex flex-col sm:flex-row justify-between mb-6 border-b border-slate-100 pb-5 gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-950">
              Order #{orderDetails._id.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Placed: {new Date(orderDetails.createdAt).toLocaleDateString()} at {new Date(orderDetails.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-wrap sm:items-end gap-2">
            <span
              className={`${
                orderDetails.isPaid
                  ? "badge-emerald"
                  : "badge-amber"
              } px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider`}
            >
              Payment: {orderDetails.isPaid ? "Paid" : "Pending"}
            </span>
            <span
              className={`${
                orderDetails.isDelivered
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              } px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider`}
            >
              Status: {orderDetails.isDelivered ? "Delivered" : "Processing"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-950 mb-2 uppercase tracking-wider text-xs">Payment Information</h4>
            <div className="space-y-1 text-xs text-slate-600 font-medium">
              <p>Method: <span className="text-slate-950 font-bold">{orderDetails.paymentMethod}</span></p>
              <p>Status: <span className={orderDetails.isPaid ? "text-emerald-700 font-bold" : "text-amber-700 font-bold"}>{orderDetails.paymentStatus}</span></p>
              {orderDetails.isPaid && (
                <p className="text-[10px] text-slate-400 mt-1.5">Paid timestamp: {new Date(orderDetails.paidAt).toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-950 mb-2 uppercase tracking-wider text-xs">Shipping Destination</h4>
            <div className="space-y-1 text-xs text-slate-600 font-medium">
              <p>Recipient: <span className="text-slate-950 font-bold">{orderDetails.shippingAddress ? `${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}` : "Customer"}</span></p>
              <p>Phone: <span className="text-slate-950 font-semibold">{orderDetails.shippingAddress?.phone}</span></p>
              <p>Address: <span className="text-slate-700">{orderDetails.shippingAddress ? `${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}, ${orderDetails.shippingAddress.country}` : "N/A"}</span></p>
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className="mb-6">
          <h4 className="font-bold text-slate-950 mb-3 uppercase tracking-wider text-xs">Items Ordered</h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  <th className="py-2.5 px-3.5">Item</th>
                  <th className="py-2.5 px-3.5 text-center">Price</th>
                  <th className="py-2.5 px-3.5 text-center">Qty</th>
                  <th className="py-2.5 px-3.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orderDetails.orderItems.map((item) => (
                  <tr key={item._id || item.productId} className="text-xs">
                    <td className="py-3 px-3.5 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-12 object-cover rounded-lg mr-3 border border-slate-200"
                      />
                      <div>
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-bold text-slate-950 hover:text-slate-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.size && (
                          <p className="text-[10px] text-slate-500 mt-0.5">Size: <span className="font-semibold text-slate-900">{item.size}</span> | Color: {item.color}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3.5 text-center font-semibold text-slate-700">${item.price.toLocaleString()}</td>
                    <td className="py-3 px-3.5 text-center font-bold text-slate-950">{item.quantity}</td>
                    <td className="py-3 px-3.5 text-right font-black text-slate-950">${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-slate-100 pt-5 gap-4">
          <Link to="/my-orders" className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-950 transition-colors flex items-center gap-1.5">
            ← Back to Orders
          </Link>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Amount:</span>
            <p className="text-2xl font-black text-slate-950 mt-0.5">${orderDetails.totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetailsPage;


