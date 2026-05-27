const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Products");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get("/stats", protect, admin, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});
        const totalUsers = await User.countDocuments({});

        // Calculate Revenue (Sum of all PAID orders)
        const paidOrders = await Order.find({ isPaid: true });
        const totalRevenue = paidOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

        // Fetch recent orders
        const recentOrders = await Order.find({})
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalRevenue,
            totalOrders,
            totalProducts,
            totalUsers,
            recentOrders
        });
    } catch (error) {
        console.error("Dashboard stats failed:", error);
        res.status(500).json({ message: "Server error calculating stats" });
    }
});

module.exports = router;
