import User from "../Model/user.model.js";
import { initialUsers } from "../database.js";

// Function to initialize the database
export const initializeDatabase = async () => {
    try {
        // Clear existing data in the User collection
        await User.deleteMany({});
        console.log("Cleared existing User data.");

        // Insert new user data
        await User.insertMany(initialUsers);
        console.log("Initialized database with users.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};