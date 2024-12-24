import express from "express"; 
import { userRoutes } from "./Routes/user.routes.js"; 
import { connectToDatabase } from "./Controller/DB.controller.js"; 

const app = express();                                      // Start the server

connectToDatabase();                                        // Call the database connection function

app.use(express.json());                                    // Middleware for parsing JSON requests

userRoutes(app);                                            // Attach user routes

const PORT = 3100;
app.listen(PORT, () => {                                    // Listen on a Port
    console.log(`Server is running on port ${PORT}`);
});