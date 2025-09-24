import { UserModel } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().populate("articles");
    if (!users.length) {
      return res.status(404).json({ msg: "No existen usuarios" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const getUsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await UserModel.findById(id);
    if (!users) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }
    return res.status(200).json({
      ok: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.validatedData;
  const { username } = req.validatedData;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id },
      { username },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      msg: "Usuario actualizado correctamente",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const deleteUsers = async (req, res) => {
  const { id } = req.validatedData;
  try {
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      msg: "Usuario eliminado",
      data: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.validatedData);
    return res.status(201).json({
      ok: true,
      msg: "Usuario creado correctamente",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
