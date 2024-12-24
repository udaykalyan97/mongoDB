import mongoose from "mongoose";
import { initializeDatabase } from "./initialDB.controller.js";

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/myDatabase";

// Function to connect to the database
export async function connectToDatabase() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully!");
        initializeDatabase();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if unable to connect
    }
};