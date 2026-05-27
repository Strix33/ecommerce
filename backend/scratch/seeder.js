const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");
const Product = require("../models/Products");
const products = require("../../products");

// Configure dotenv to load backend/.env
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB for seeding...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected successfully for seeding.");

        // 1. Create default admin user if not exists
        let adminUser = await User.findOne({ email: "admin@rabbit.com" });
        if (!adminUser) {
            console.log("Creating default admin user...");
            adminUser = new User({
                name: "Rabbit Admin",
                email: "admin@rabbit.com",
                password: "admin12345", // Will be hashed by UserSchema pre-save hook
                role: "admin"
            });
            await adminUser.save();
            console.log("Default admin user created: admin@rabbit.com / admin12345");
        } else {
            console.log("Default admin user already exists.");
        }

        // 2. Clear existing products
        console.log("Clearing existing products in database...");
        await Product.deleteMany({});
        console.log("Products collection cleared.");

        // 3. Map seed products to schema format and insert
        console.log(`Mapping ${products.length} products for database schema...`);
        const formattedProducts = products.map((prod) => {
            return {
                name: prod.name,
                description: prod.description,
                price: prod.price,
                discountPrice: prod.discountPrice || undefined,
                countInStock: prod.countInStock !== undefined ? prod.countInStock : 20,
                sku: prod.sku || `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                category: prod.category || "General",
                brand: prod.brand || "Rabbit Wear",
                sizes: prod.sizes || ["S", "M", "L", "XL"],
                colors: prod.colors || ["Black", "White"],
                collection: prod.collections || "Casual Wear", // Map 'collections' to 'collection'
                material: prod.material || "Cotton",
                gender: prod.gender || "Unisex",
                images: (prod.images || []).map(img => ({
                    url: img.url,
                    alt: img.altText || prod.name // Map 'altText' to 'alt'
                })),
                rating: prod.rating || 0,
                numReviews: prod.numReviews || 0,
                isFeatured: prod.rating >= 4.7, // Set high-rated products as featured
                isPublished: true,
                user: adminUser._id // Link to admin user
            };
        });

        console.log("Seeding products into database...");
        await Product.insertMany(formattedProducts);
        console.log("Database seeded successfully with all products!");

        process.exit(0);
    } catch (error) {
        console.error("Database seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();
