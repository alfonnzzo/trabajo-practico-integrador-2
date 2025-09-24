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

export const getMyArticles = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Usuario no autenticado" });
    }
    const articles = await ArticleModel.find({ author: req.user.id }).populate(
      "tags",
      "name"
    );
    return res.status(200).json({
      msg: "Artículos del usuario",
      count: articles.length,
      articles: articles,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

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
    console.log(req.params.id)
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