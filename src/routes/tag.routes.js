import { Router } from "express";
import {
  createTag,
  getTags,
  getTagsById,
  updateTags,
  deleteTags,
} from "../controllers/tag.controller.js";
import { applyValidations } from "../middlewares/applyValidation.js";
import {
  createTagValidations,
  tagIdValidation,
  updateTagValidations,
} from "../middlewares/validations/tag.validator.js";
const tagRoutes = Router();
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { AdminMiddleware } from "../middlewares/admin.middlewares.js";

tagRoutes.post(
  "/tags",
  authMiddleware,
  AdminMiddleware,
  createTagValidations,
  applyValidations,
  createTag
);
tagRoutes.get("/tags", authMiddleware, getTags);
tagRoutes.get(
  "/tags/:id",
  authMiddleware,
  tagIdValidation,
  applyValidations,
  getTagsById
);
tagRoutes.put(
  "/tags/:id",
  AdminMiddleware,
  authMiddleware,
  tagIdValidation,
  updateTagValidations,
  applyValidations,
  updateTags
);
tagRoutes.delete(
  "/tags/:id",
  AdminMiddleware,
  authMiddleware,
  tagIdValidation,
  applyValidations,
  deleteTags
);

export default tagRoutes;
