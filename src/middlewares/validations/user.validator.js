import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import mongoose from "mongoose";

// --- CREATE ---
export const createUserValidations = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("El nombre de usuario debe tener entre 3 y 200 caracteres"),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value) => {
      const existingUser = await UserModel.findOne({ email: value });
      if (existingUser) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),

  body("profile.firstName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("profile.lastName")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("profile.biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),

  body("profile.avatarUrl")
    .optional()
    .isURL()
    .withMessage("Debe ser una URL válida")
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/)
    .withMessage("El avatar debe ser una imagen válida (jpg, png, gif, webp)"),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("La fecha de nacimiento debe tener un formato válido"),
];

export const updateUserValidations = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("El nombre de usuario debe tener entre 3 y 200 caracteres"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ser un email válido")
    .custom(async (value, { req }) => {
      const existingUser = await UserModel.findOne({ email: value });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        throw new Error("El email ya está registrado por otro usuario");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol debe ser 'user' o 'admin'"),

  body("profile.firstName").optional().isLength({ min: 2, max: 50 }),

  body("profile.lastName").optional().isLength({ min: 2, max: 50 }),

  body("profile.biography").optional().isLength({ max: 500 }),

  body("profile.avatarUrl")
    .optional()
    .isURL()
    .matches(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/),

  body("profile.birthDate").optional().isISO8601().toDate(),
];

export const userIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID no es válido")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (!user) {
        throw new Error("No existe un usuario con ese ID");
      }
      return true;
    }),
];
