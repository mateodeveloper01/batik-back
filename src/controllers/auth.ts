import { Request, Response } from "express";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const user = await UserModel.findOne(req.body);
    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: "Datos ingresados incorrectos" });
    }
    const tokenPayload = {
      sub: user._id,
      username: user.username,
      email: user.email,
      admin: user.admin,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY as string);

    res.cookie("jwt", token, {
      //...... 1s    1m   1h   1d   6 meses
      maxAge: 1000 * 60 * 60 * 24 * 180,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Usuario logeado",
      data: tokenPayload,
    });
  } catch (error) {
    res.status(404).json({ message: "Error al logear usuario", error });
  }
};

export const register = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    await new UserModel(req.body).save();
    res.json({ message: "Usuario registrado", user: req.body }).status(200);
  } catch (error) {
    res.status(404).json({ message: "Error al registrar usuario", error });
  }
};
