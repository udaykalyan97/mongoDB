const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        immutable: true,
    },
    isAdult: {
        type: Boolean,
        default: true,
    },
    hobbies: Array,
});

module.exports = mongoose.model("User", userSchema);
