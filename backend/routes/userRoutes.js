const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ name, email, password });
        await user.save();

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        });
    } catch (error) {
        console.error("User registration failed:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// @desc    Auth user & get token (login)
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { user: { id: user._id, role: user.role } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.json({
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        });
    } catch (error) {
        console.error("User login failed:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// @desc    Get user profile details
// @route   GET /api/users/profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error("Fetch profile failed:", error);
        res.status(500).json({ message: 'Server error fetching profile' });
    }
});

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        console.error("Admin fetch users failed:", error);
        res.status(500).json({ message: "Server error fetching users list" });
    }
});

// @desc    Update user details/role (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        console.error("Admin user update failed:", error);
        res.status(500).json({ message: "Server error updating user" });
    }
});

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Prevent self deletion
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ message: "Admin cannot delete their own account" });
        }

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Admin delete user failed:", error);
        res.status(500).json({ message: "Server error deleting user" });
    }
});

module.exports = router;
