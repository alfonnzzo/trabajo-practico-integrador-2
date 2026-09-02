import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../helpers/jwt.helper.js";

// Opciones únicas para la cookie de sesión: se usan al setearla y al borrarla.
// Si no coinciden, el navegador no borra la cookie en el logout.
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const register = async (req, res) => {
  // `role` NO se lee del body: si se leyera, cualquiera podría registrarse
  // mandando { role: "admin" } y saltearse todos los permisos.
  const { username, email, password, profile } = req.body;
  try {
    // El hasheo va dentro del try: si falta `password`, bcrypt lanza.
    const hashed = await hashPassword(password);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashed,
      role: "user",
      profile,
    });
    return res.status(201).json({
      ok: true,
      msg: "Usuario y perfil creados correctamente",
      // No devolvemos el documento entero: incluye el hash de la contraseña.
      data: { id: newUser.id, username: newUser.username, email: newUser.email },
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
    // Misma respuesta para "no existe" y "contraseña incorrecta". Si se
    // distinguen (404 vs 401), se puede averiguar qué usuarios existen.
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
      profile: user.profile,
    });

    res.cookie("token", token, { ...cookieOptions, maxAge: 1000 * 60 * 60 });

    return res.json({ ok: true, msg: "Login exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  return res.json({ ok: true, msg: "Logout exitoso" });
};
