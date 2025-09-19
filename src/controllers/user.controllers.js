import { UserModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
    const {username, email, password, role, profile} = req.body;
    try {
        const newUser = await UserModel.create({
            username,
            email,
            password,
            role,
            profile
        });
            res.status(201).json ({
            ok:true,
            msg: "usuario y perfil creado correctamente",
            data: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json ({
            ok:false,
            msg: "error interno del servidor"
        });
    }
};