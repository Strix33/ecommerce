const mongoose = require("mongoose");

const DEFAULT_MONGO_URI = "mongodb+srv://Strix:Rudrapratap%4072@cluster0.f9me7mu.mongodb.net/rabbit?retryWrites=true&w=majority&appName=Cluster0";

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        const uri = process.env.MONGO_URI || DEFAULT_MONGO_URI;
        const conn = await mongoose.connect(uri);
        isConnected = !!conn.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err);
    }
};

module.exports = connectDB;