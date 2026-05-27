const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load env vars FIRST before anything else
dotenv.config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

connectDB();

app.get("/", (req, res) => {
    res.send("WELCOME TO RABBIT API");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});