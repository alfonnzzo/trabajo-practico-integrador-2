import { param } from "express-validator";
import mongoose from "mongoose";
import { CommentModel } from "../../models/comment.model.js";

export const commentIdValidation = [
  // Verifica que sea un ObjectId válido
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El ID no es válido"),

  // Verifica que exista un comentario con ese ID
  param("id").custom(async (value) => {
    const comment = await CommentModel.findById(value);
    if (!comment) {
      throw new Error("No existe un comentario con ese ID");
    }
    return true;
  }),
];
