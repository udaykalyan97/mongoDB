import express from "express";
import User from "./User.js";  

const router = express.Router();

// Middleware to validate request body for POST and PUT
const validateUserInput = (req, res, next) => {
    const { name, age, hobbies } = req.body;

    // Validation checks
    if (!name || typeof age !== "number" || !Array.isArray(hobbies)) {
        return res.status(400).json({
            message: "All fields (name, age, hobbies) are required, age must be a number and hobbies must be in an array",
        });
    }
    next();
};

// Fetch all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "All Users List", users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

// Fetch a particular user by ID
router.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Found user", user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
});

// Add a new user
router.post("/user", validateUserInput, async (req, res) => {
    try {
        // Create a new user with the provided data
        const newUser = new User({
            name: req.body.name,
            age: req.body.age,
            isAdult: req.body.isAdult !== undefined ? req.body.isAdult : true, // Default isAdult to true if not provided
            hobbies: req.body.hobbies,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: "User added", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error adding user", error });
    }
});

// Update a user by ID
router.put("/user/:id", validateUserInput, async (req, res) => {
    try {
        // Ensure that age is not updated since it is immutable
        const { age, ...updateData } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData }, // Only update allowed fields
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(202).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});

// Delete a user by ID
router.delete("/user/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
});

export default router;
