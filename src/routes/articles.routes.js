import { Router } from "express";
import {
    createArticles,
    getArticles,
    getArticleById,
    updateArticles,
    deleteArticle
} from "../controllers/article.controller.js";  

const articlesRoutes = Router() 

articlesRoutes.post("/article", createArticles)
articlesRoutes.get("/articles", getArticles)
articlesRoutes.get("/articles/:id", getArticleById)
articlesRoutes.put("/articles/:id", updateArticles)
articlesRoutes.delete("/articles/:id", deleteArticle)

export default articlesRoutes;