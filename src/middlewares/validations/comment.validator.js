import { body } from "express-validator";

export const commentValidations = [
  // content obligatorio, mínimo 5, máximo 500
  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El contenido debe tener entre 5 y 500 caracteres"),

  // author obligatorio y debe ser ObjectId válido
  body("author")
    .notEmpty()
    .withMessage("El autor es obligatorio")
    .isMongoId()
    .withMessage("El autor debe ser un ID de MongoDB válido"),

  // article obligatorio y debe ser ObjectId válido
  body("article")
    .notEmpty()
    .withMessage("El artículo es obligatorio")
    .isMongoId()
    .withMessage("El artículo debe ser un ID de MongoDB válido"),
];
