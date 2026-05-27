const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Products");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post("/", protect, async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        // Create order
        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        const createdOrder = await order.save();

        // Update product inventory stock
        for (const item of orderItems) {
            const product = await Product.findById(item.productId);
            if (product) {
                product.countInStock = Math.max(0, product.countInStock - item.quantity);
                await product.save();
            }
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error("Order creation failed:", error);
        res.status(500).json({ message: "Server error creating order" });
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Fetch personal orders failed:", error);
        res.status(500).json({ message: "Server error fetching orders" });
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Check if the order belongs to the user or if user is admin
        if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to view this order" });
        }

        res.json(order);
    } catch (error) {
        console.error("Fetch order details failed:", error);
        res.status(500).json({ message: "Server error fetching order details" });
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("user", "id name email")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Admin fetch orders failed:", error);
        res.status(500).json({ message: "Server error fetching all orders" });
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put("/:id/pay", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentStatus = "Paid";
        order.paymentResult = {
            id: req.body.id || `MOCK_TXN_${Date.now()}`,
            status: req.body.status || "COMPLETED",
            email_address: req.body.email_address || req.user.email
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error("Order payment update failed:", error);
        res.status(500).json({ message: "Server error updating payment status" });
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
router.put("/:id/deliver", protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.isDelivered = !order.isDelivered;
        order.deliveredAt = order.isDelivered ? Date.now() : null;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error("Order delivery status failed:", error);
        res.status(500).json({ message: "Server error updating delivery status" });
    }
});

module.exports = router;
