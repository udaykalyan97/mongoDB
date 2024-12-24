import { getUsers, getUserById, postUser, updateUser, deleteUser } from "../Controller/user.controller.js";
import { validateUserInput } from "../Middlewares/userValidation.middleware.js";

export function userRoutes(app) {
    app.get('/users', getUsers); 
    app.get("/user/:id", getUserById); 
    
    // Apply validation middleware only for POST and PUT
    app.post("/user", validateUserInput, postUser); 
    app.put("/user/:id", validateUserInput, updateUser); 
    
    app.delete("/user/:id", deleteUser); 
}
