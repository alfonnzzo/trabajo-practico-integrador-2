import { 
    getUsers,
    getUsersById,
    updateUser,
    deleteUsers
 } from "../controllers/user.controller.js";   


import { Router } from "express";   

const userRoutes = Router()

userRoutes.get ("/users", getUsers)
userRoutes.get ("/users/:id", getUsersById)
userRoutes.put ("/users/:id", updateUser)
userRoutes.delete ("/users/:id", deleteUsers)

export default userRoutes;