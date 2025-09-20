import { 
    createUser,
    getUsers,
    getUsersById,
    updateUsers,
    deleteUsers
 } from "../controllers/user.controller.js";   
import { Router } from "express";   

export const userRoutes = Router()

userRoutes.post ("/users", createUser);
userRoutes.get ("/users", getUsers);
userRoutes.get ("/users/:id", getUsersById);
userRoutes.put ("/users/:id", updateUsers);
userRoutes.delete ("/users/:id", deleteUsers);
