import { body } from "express-validator";

export const articleValidations = [
  // title requerido
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  // content requerido
  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  // excerpt opcional
  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El extracto no puede superar los 500 caracteres"),

  // status opcional
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),

  // author: array de ObjectIds
  body("author")
    .optional()
    .isArray()
    .withMessage("El autor debe ser un array de IDs"),
  body("author.*")
    .isMongoId()
    .withMessage("Cada autor debe ser un ID de MongoDB válido"),

  // tags: array de ObjectIds
  body("tags")
    .optional()
    .isArray()
    .withMessage("Los tags deben ser un array de IDs"),
  body("tags.*")
    .isMongoId()
    .withMessage("Cada tag debe ser un ID de MongoDB válido"),
];

export const updateArticleValidations = [
  body("title")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),

  body("content")
    .optional()
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),

  body("excerpt")
    .optional()
    .isLength({ max: 500 })
    .withMessage("El extracto no puede superar los 500 caracteres"),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'"),

  body("author")
    .optional()
    .isArray()
    .withMessage("El autor debe ser un array de IDs"),
  body("author.*")
    .isMongoId()
    .withMessage("Cada autor debe ser un ID de MongoDB válido"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Los tags deben ser un array de IDs"),
  body("tags.*")
    .isMongoId()
    .withMessage("Cada tag debe ser un ID de MongoDB válido"),
];

export const articleIdValidation = [
  // Verifica que sea un ObjectId válido
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID no es válido"),

  // Verifica que exista un artículo con ese ID
  param("id").custom(async (value) => {
    const article = await ArticleModel.findById(value);
    if (!article) {
      throw new Error("No existe un artículo con ese ID");
    }
    return true;
  }),
];
