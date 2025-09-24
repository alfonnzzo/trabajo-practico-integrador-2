
import { hashPassword, comparePassword} from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js"; 

export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  const hashed = await hashPassword(password);
  try {
    const newUser = await UserModel.create({
      username,
      email,
      password: hashed,
      role,
      profile,
    });
    return res.status(201).json({
      ok: true,
      msg: "Usuario y perfil creados correctamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: "Credenciales invalidas" });
    }
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
      profile: user.profile  
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.json({ msg: "Login exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    }); 
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.json({ msg: "Logout exitoso" }); 
};
