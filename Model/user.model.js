import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true, // Trim whitespace
    },
    lastName: {
        type: String,
        trim: true, // Trim whitespace
    },
    age: {
        type: Number,
    },
    hobby: {
        type: [String], // Array of strings
    },
    isAdult: {
        type: Boolean,
        default: function () {
            return this.age > 18; // Automatically set based on age
        },
    },
});

const User = mongoose.model("User", userSchema);

export default User;
