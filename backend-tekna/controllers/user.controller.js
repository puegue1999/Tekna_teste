import * as userService from "../services/user.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await userService.createUser(name, email, hashedPassword);
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { externalId: user.external_id, email: user.email },
      process.env.JWT_ENCRYPTION,
      { expiresIn: process.env.JWT_EXPIRATION}
    );

    res.status(201).json({ token: token });

  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  
};