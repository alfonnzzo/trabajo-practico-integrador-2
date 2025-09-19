import { createUser } from "../controllers/user.controllers.js";   
import { Router } from "express";   

export const userRoutes = Router()

userRoutes.post ("/user", createUser)
