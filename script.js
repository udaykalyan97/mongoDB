const mongoose = require("mongoose");
const User = require("./user");

mongoose.connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connection successful");
});

db.on("error", (err) => {
    console.log("Connection not successful", err);
});

async function main() {
    try {
        // Create a new user and save
        const newUser = new User({
            name: "Uday",
            age: 27,
            isAdult: true,
            hobbies: ["teaching"],
        });

        const savedUser = await newUser.save();
        console.log("Saved User:", savedUser);

        // Create another user directly
        const user2 = await User.create({
            name: "Ankit",
            age: 23,
            isAdult: true,
            hobbies: ["Reading"],
        });

        console.log("Created User:", user2);

        // Find all users
        const users = await User.find();
        console.log("All Users:", users);

        // Find a specific user
        const particularUser = await User.findOne({ name: "Ankit" });
        console.log("User with name Ankit:", particularUser);

        // Create another user and update it
        const user3 = await User.create({
            name: "Rohit",
            age: 17,
            isAdult: false,
            hobbies: ["Badminton"],
        });

        user3.name = "Rahul";
        const youngUser = await user3.save();
        console.log("Updated User:", youngUser);

        // Delete a user
        const deletedUser = await User.deleteOne({ name: "Uday" });
        console.log("Deleted User:", deletedUser);

        // Delete multiple users
        const deleteAllUsers = await User.deleteMany({ name: "Uday" });
        console.log("Deleted All Matching Users:", deleteAllUsers);

        // Create another user and save
        const user4 = await User.create({ name: "ABC", age: 12 });
        console.log("Created User:", user4);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

// Call the async main function
main();
