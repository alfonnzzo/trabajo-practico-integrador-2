import { TagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newTag = await TagModel.create({ name, description });
        return res.status(201).json({
            ok: true,
            msg: "Etiqueta creada correctamente",
            data: newTag
        })
    } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await TagModel.find().populate("tags");
    if (!tags.length) {
      return res.status(404).json({ msg: "No existen etiquetas" });
    }
    return res.status(200).json(tags);
  } catch (error) {
    console.error("Error al obtener etiquetas:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};

export const getTagsById = async (req, res) => {
  const { id } = req.params;
  try {
    const tags = await TagModel.findById(id);
    if (!tags) {
      return res.status(404).json({ msg: "No existe la etiqueta" });
    }
    return res.status(200).json({
      ok: true,
      data: tags
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateTags = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedTags = await TagModel.findByIdAndUpdate(
      { _id: id },
      { name, description },
      { new: true }
    );
    if (!updatedTags) {
      return res.status(404).json({
        message: "Etiqueta no encontrada"
      });
    }
    return res.status(200).json({
      ok: true,
      msg: "Etiqueta actualizada correctamente",
      data: updatedTags
    });
  } catch (error) {
    console.error("Error actualizando etiqueta:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};

export const deleteTags = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTags = await TagModel.findByIdAndDelete(id);
    if (!deletedTags) {
      return res.status(404).json({
        ok: false,
        msg: "Etiqueta no encontrada"
      });
    }
    return res.status(200).json({
      ok: true,
      msg: "Etiqueta eliminada correctamente",
      data: deleteTags
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};