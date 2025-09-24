import { Router } from "express";
import {
  createArticles,
  getArticles,
  getArticleById,
  getMyArticles,
  updateArticles,
  deleteArticle } from "../controllers/article.controller.js";
import {
  articleIdValidation,
  createArticleValidations,
  updateArticleValidations,
} from "../middlewares/validations/article.validator.js";
import { applyValidations } from "../middlewares/applyValidation.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { AdminMiddleware } from "../middlewares/admin.middlewares.js";
import { ownerMiddleware } from "../middlewares/owner.middlewares.js";

const articlesRoutes = Router();

articlesRoutes.post("/articles", authMiddleware, createArticleValidations, applyValidations, createArticles);
articlesRoutes.get("/articles", authMiddleware, getArticles);
articlesRoutes.get("/articles/:id", authMiddleware, articleIdValidation, applyValidations, getArticleById);
articlesRoutes.get("/articles/my", authMiddleware, applyValidations, getMyArticles);
articlesRoutes.put("/articles/:id", ownerMiddleware, AdminMiddleware,  articleIdValidation, updateArticleValidations, applyValidations, updateArticles);
articlesRoutes.delete("/articles/:id", authMiddleware, ownerMiddleware, articleIdValidation, applyValidations, deleteArticle);

export default articlesRoutes;
