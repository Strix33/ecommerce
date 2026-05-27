import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const OrdersDetailsPage = () => {
  const { id } = useParams();
  const { token, user } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:9000/api/orders/${id}`, {
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="text-center py-24 min-h-screen text-gray-500 font-medium">
        Order not found or loading failed.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 mt-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 uppercase tracking-wide">Order Details</h2>
      
      <div className="p-6 rounded-xl border border-gray-100 shadow-sm bg-white">
        <div className="flex flex-col sm:flex-row justify-between mb-8 border-b pb-4 gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">
              Order ID: #{orderDetails._id.toUpperCase()}
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Placed on: {new Date(orderDetails.createdAt).toLocaleDateString()} at {new Date(orderDetails.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <span
              className={`${
                orderDetails.isPaid
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              } px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider`}
            >
              Payment: {orderDetails.isPaid ? "Paid" : "Pending"}
            </span>
            <span
              className={`${
                orderDetails.isDelivered
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-gray-50 text-gray-500 border-gray-200"
              } px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider`}
            >
              Status: {orderDetails.isDelivered ? "Delivered" : "Processing"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-xs">Payment Information</h4>
            <div className="space-y-1 text-sm text-gray-600 font-semibold">
              <p>Method: <span className="text-gray-900">{orderDetails.paymentMethod}</span></p>
              <p>Status: <span className={orderDetails.isPaid ? "text-green-600" : "text-amber-600"}>{orderDetails.paymentStatus}</span></p>
              {orderDetails.isPaid && (
                <p className="text-xs text-gray-400 mt-2 font-normal">Paid on {new Date(orderDetails.paidAt).toLocaleString()}</p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-xs">Delivery Details</h4>
            <div className="space-y-1 text-sm text-gray-600 font-semibold">
              <p>Customer: <span className="text-gray-900">{orderDetails.shippingAddress ? `${orderDetails.shippingAddress.firstName} ${orderDetails.shippingAddress.lastName}` : "Customer"}</span></p>
              <p>Phone: <span className="text-gray-900">{orderDetails.shippingAddress?.phone}</span></p>
              <p>Address: <span className="text-gray-900">{orderDetails.shippingAddress ? `${orderDetails.shippingAddress.address}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.postalCode}, ${orderDetails.shippingAddress.country}` : "N/A"}</span></p>
              {orderDetails.isDelivered && (
                <p className="text-xs text-gray-400 mt-2 font-normal">Shipped on {new Date(orderDetails.deliveredAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Product list */}
        <div className="mb-8">
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wide text-xs">Products Purchased</h4>
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="min-w-full text-gray-600">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left text-xs font-bold uppercase text-gray-700">
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4 text-center">Unit Price</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orderDetails.orderItems.map((item) => (
                  <tr key={item._id || item.productId} className="text-sm">
                    <td className="py-4 px-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 object-cover rounded-lg mr-4 border"
                      />
                      <div>
                        <Link
                          to={`/product/${item.productId}`}
                          className="font-bold text-black hover:underline"
                        >
                          {item.name}
                        </Link>
                        {item.size && (
                          <p className="text-xs text-gray-500 font-semibold mt-0.5">Size: <span className="uppercase">{item.size}</span> | Color: {item.color}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-semibold">${item.price.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center font-bold">{item.quantity}</td>
                    <td className="py-4 px-4 text-right font-bold text-black">${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-6 bg-white">
          {/* Back to order link */}
          <Link to="/my-orders" className="text-sm font-bold text-black hover:underline flex items-center gap-1.5">
            ← Back to My Orders
          </Link>
          <div className="text-right">
            <span className="text-sm text-gray-500 font-semibold uppercase">Grand Total:</span>
            <p className="text-2xl font-black text-black mt-0.5">${orderDetails.totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetailsPage;
