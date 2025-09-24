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

import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:id", userIdValidation, applyValidations, getUsersById);
userRoutes.put(
  "/users/:id",
  userIdValidation,
  updateUserValidations,
  applyValidations,
  updateUser
);
userRoutes.delete(
  "/users/:id",
  userIdValidation,
  applyValidations,
  deleteUsers
);
userRoutes.post("/users", createUserValidations, applyValidations, createUser);

export default userRoutes;
