import User from "../Model/user.model.js";
import { validateUserInput } from "../Middlewares/userValidation.middleware.js";

// Fetching user data
export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json({
            message: "All Users List",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// Fetch a particular user by ID
export const getUserById = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the URL parameter

    try {
        const user = await User.findById(userId); // Find user by ID in the database

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "Found user",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};

// Adding a new user
export const postUser = async (req, res) => {
    const { firstName, lastName, hobby, age } = req.body;

    try {
        const newUser = new User({
            firstName,
            lastName,
            hobby,
            age,
        });

        await newUser.save(); // Save the new user to the database

        res.status(201).json({
            message: "User Added",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add user",
            error: error.message,
        });
    }
};


// Updating a user by ID
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        // Update user and recalculate `isAdult` if `age` is updated
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User with this ID does not exist",
            });
        }

        if (updates.age !== undefined) {
            updates.isAdult = updates.age > 18; // Set `isAdult` based on `age`
        }

        Object.assign(user, updates); // Apply updates to the user
        await user.save();

        res.status(202).json({
            message: "User Updated",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update user",
            error: error.message,
        });
    }
};


// Deleting a user by ID
export const deleteUser = async (req, res) => {
    const userId = req.params.id; // Extract the user ID from the URL parameters

    try {
        const user = await User.findByIdAndDelete(userId); // Find and delete user by ID

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
            });
        }

        res.status(200).json({
            message: "User Deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
        });
    }
};
