import { body, param } from "express-validator";
import { TagModel } from "../models/tag.model.js";
import mongoose from "mongoose";

// --- CREATE ---
export const createTagValidations = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .trim()
    .custom(async (value) => {
      const existingTag = await TagModel.findOne({ name: value });
      if (existingTag) {
        throw new Error("Ya existe una etiqueta con ese nombre");
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];

// --- UPDATE ---
export const updateTagValidations = [
  body("name")
    .optional()
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre debe tener entre 2 y 30 caracteres")
    .custom(async (value, { req }) => {
      const existingTag = await TagModel.findOne({ name: value });
      if (existingTag && existingTag._id.toString() !== req.params.id) {
        throw new Error("Ya existe otra etiqueta con ese nombre");
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];

// --- GET BY ID ---
export const tagIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID no es válido")
    .custom(async (value) => {
      const tag = await TagModel.findById(value);
      if (!tag) {
        throw new Error("No existe una etiqueta con ese ID");
      }
      return true;
    }),
];
