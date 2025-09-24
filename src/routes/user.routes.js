import {
  getUsers,
  getUsersById,
  updateUser,
  deleteUsers,
  createUser,
} from "../controllers/user.controller.js";
import { applyValidations } from "../middlewares/applyValidation.js";
import {
  createUserValidations,
  updateUserValidations,
  userIdValidation,
} from "../middlewares/validations/user.validator.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { Router } from "express";
import { AdminMiddleware } from "../middlewares/admin.middlewares.js";

const userRoutes = Router();

userRoutes.post("/users", AdminMiddleware, createUserValidations, applyValidations, createUser);
userRoutes.get("/users", AdminMiddleware, authMiddleware, getUsers);
userRoutes.get("/users/:id", AdminMiddleware, authMiddleware, userIdValidation, applyValidations, getUsersById);
userRoutes.put("/users/:id", AdminMiddleware, authMiddleware, userIdValidation, updateUserValidations, applyValidations, updateUser);
userRoutes.delete("/users/:id", AdminMiddleware, authMiddleware, userIdValidation, applyValidations, deleteUsers);


export default userRoutes;
