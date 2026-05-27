const express = require("express");
const Product = require("../models/Products");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Get all products with filtering, search, sorting and pagination
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
    try {
        const {
            category,
            gender,
            collection,
            color,
            size,
            minPrice,
            maxPrice,
            search,
            sortBy,
            limit,
            page
        } = req.query;

        let query = {};

        // Apply filters
        if (category) {
            query.category = category;
        }

        if (gender) {
            query.gender = gender;
        }

        if (collection) {
            query.collection = collection;
        }

        if (color) {
            // Colors is stored as an array of strings in Mongoose
            query.colors = { $in: [color] };
        }

        if (size) {
            // Sizes is stored as an array of strings in Mongoose
            query.sizes = { $in: [size] };
        }

        // Price range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Search query (case insensitive search across name/description)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Setup Sorting
        let sortOption = {};
        if (sortBy === "priceAsc") {
            sortOption = { price: 1 };
        } else if (sortBy === "priceDesc") {
            sortOption = { price: -1 };
        } else if (sortBy === "rating") {
            sortOption = { rating: -1 };
        } else {
            sortOption = { createdAt: -1 }; // Default: Latest arrivals
        }

        // Pagination setup
        const limitNum = Number(limit) || 8;
        const pageNum = Number(page) || 1;
        const skip = (pageNum - 1) * limitNum;

        const products = await Product.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limitNum);

        const totalProducts = await Product.countDocuments(query);

        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limitNum),
            currentPage: pageNum
        });
    } catch (error) {
        console.error("Get products failed:", error);
        res.status(500).json({ message: "Server error retrieving products" });
    }
});

// @desc    Get new arrivals (8 latest products)
// @route   GET /api/products/new-arrivals
// @access  Public
router.get("/new-arrivals", async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ createdAt: -1 })
            .limit(8);
        res.json(products);
    } catch (error) {
        console.error("Fetch new arrivals failed:", error);
        res.status(500).json({ message: "Server error fetching new arrivals" });
    }
});

// @desc    Get best sellers / featured products
// @route   GET /api/products/best-sellers
// @access  Public
router.get("/best-sellers", async (req, res) => {
    try {
        // Find featured products, default to highly rated if none are explicitly featured
        const products = await Product.find({ isFeatured: true })
            .limit(8);
        
        if (products.length > 0) {
            return res.json(products);
        }

        const fallbackProducts = await Product.find({})
            .sort({ rating: -1 })
            .limit(8);
        res.json(fallbackProducts);
    } catch (error) {
        console.error("Fetch best sellers failed:", error);
        res.status(500).json({ message: "Server error fetching best sellers" });
    }
});

// @desc    Get similar products recommendations (excluding self)
// @route   GET /api/products/similar/:id
// @access  Public
router.get("/similar/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Fetch products in the same category or gender, excluding current ID
        const similar = await Product.find({
            _id: { $ne: product._id },
            $or: [
                { category: product.category },
                { gender: product.gender }
            ]
        }).limit(4);

        res.json(similar);
    } catch (error) {
        console.error("Get similar products failed:", error);
        res.status(500).json({ message: "Server error fetching similar products" });
    }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error("Get product by ID failed:", error);
        res.status(500).json({ message: "Server error fetching product details" });
    }
});

// @desc    Create a product (Admin only)
// @route   POST /api/products
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
    try {
        const {
            name, 
            description, 
            price, 
            discountPrice, 
            countInStock, 
            category, 
            brand, 
            sizes,
            colors, 
            collection, 
            material, 
            gender,
            images, 
            isFeatured, 
            isPublished, 
            tags, 
            dimensions, 
            weight,
            sku
        } = req.body;

        const productExists = await Product.findOne({ sku });
        if (productExists) {
            return res.status(400).json({ message: `Product with SKU ${sku} already exists` });
        }

        const product = new Product({
            name, 
            description, 
            price, 
            discountPrice: discountPrice || undefined, 
            countInStock: countInStock || 0, 
            category, 
            brand, 
            sizes,
            colors, 
            collection, 
            material, 
            gender,
            images, 
            isFeatured: isFeatured || false, 
            isPublished: isPublished || false, 
            tags, 
            dimensions, 
            weight,
            sku,
            user: req.user.id
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error("Product creation failed:", error);
        res.status(500).json({ message: "Server Error creating product" });
    }
});

// @desc    Update a product (Admin only)
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const {
            name, 
            description, 
            price, 
            discountPrice, 
            countInStock, 
            category, 
            brand, 
            sizes,
            colors, 
            collection, 
            material, 
            gender,
            images, 
            isFeatured, 
            isPublished, 
            tags, 
            dimensions, 
            weight,
            sku
        } = req.body;

        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price !== undefined ? price : product.price;
            product.discountPrice = discountPrice !== undefined ? discountPrice : product.discountPrice;
            product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collection = collection || product.collection;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight !== undefined ? weight : product.weight;
            product.sku = sku || product.sku;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Product update failed:", error);
        res.status(500).json({ message: "Server Error updating product" });
    }
});

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Product deletion failed:", error);
        res.status(500).json({ message: "Server Error deleting product" });
    }
});

module.exports = router;