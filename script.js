import mongoose from "mongoose";
import User from "./User.js";

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.on("open", () => {
    console.log("Connection successful");
});

db.on("error", (err) => {
    console.log("Connection not successful", err);
});

const newUser = new User({
    name: "Anshika",
    age: 26,
    isAdult: true,
    hobbies: ["teaching"],
});

newUser.save().then((data) => {
    console.log(data);
})
 

const user2 = await User.create({
    name: "Ankit",
    age: 23,
    isAdult: true,
    hobbies: ["Reading"],
});

user2.save().then((data) => {
    console.log(data);
});

const users = await User.find();
console.log(users);

const particularUser = await User.findOne({name: "Ankit"});
console.log("User with name Ankit", particularUser);

const user3 = await User.create({
    name: "Rohit",
    age: 17,
    isAdult: false,
    hobbies: ["Playing Badminton"],
});

user3.name = "Rahul";

const youngUser = await user3.save();

console.log(youngUser);

const deletedUser = await User.deleteOne({name: "Anshika"});

const deleteAllUsers = await User.deleteMany({name: "Anshika"});

console.log(deletedUser);

const user4 = await User.create({
    name: "ABC",
    age: 12,
});

await user4.save();