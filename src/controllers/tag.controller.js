import { TagModel } from "../models/tag.model";

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
    const tags = await TagModel.find();
    if (!tags.length) {
      return res.status(404).json({ msg: "No existen usuarios" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor"
    });
  }
};