import { ArticleModel } from "../models/article.model.js";

export const createArticles = async (req, res) => {
    try {
        const newArticle = new ArticleModel(req.body);
        await newArticle.save();
        return res.status(201).json({
            ok: true,
            msg: "Articulo creado correctamente",
            data: newArticle
        })
    } catch (error) {
        console.error("Error al obtener articulos:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error interno del servidor"
        });
    }
}

export const getArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find().populate("author").populate("tags");
        return res.status(200).json(articles);
    } catch (error) {
        console.error("Error al obtener articulos:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error interno del servidor"
        });
    }
}

export const getArticleById = async (req, res) => {
    try {
        const article = await ArticleModel.findById(req.params.id).populate("author").populate("tags");
        return res.status(200).json(article);
    } catch (error) {
        console.error("Error al obtener articulos:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error interno del servidor"
        });
    }
}

export const updateArticles = async (req, res) => {
    try {
        const updateArticle = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({
            ok: true,
            msg: "Articulo actualizado correctamente",
            data: updateArticle
        })
    } catch (error) {
        console.error("Error al obtener articulos:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error interno del servidor"
        });
    }
}

export const deleteArticle = async (req, res) => {
    try {
        const deleteArticle = await ArticleModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            ok: true,
            msg: "Articulo eliminado correctamente",
            data: deleteArticle
        })
    } catch (error) {
        console.error("Error al obtener articulos:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error interno del servidor"
        });
    }
}