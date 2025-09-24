import { CommentModel } from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const newComment = new CommentModel(req.body);
    await newComment.save();
    return res.status(201).json({
      ok: true,
      msg: "Comentario creado correctamente",
      data: newComment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      ok: false,
      msg: "Error interno del servidor" 
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    populate("author").populate("article");
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getCommentsById = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.id)
      .populate("author")
      .populate("article");
    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
export const updateComments = async (req, res) => {
  try {
    const updateComment = await CommentModel.findByIdAndUpdate(
      req.params.id,
      req.validatedData,
      { new: true }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
export const deleteComments = async (req, res) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      ok: true,
      msg: "Comentario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
