import * as userService from "../services/user.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await userService.createUser(name, email, hashedPassword);

    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Authenticate user and return token
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { externalId: user.externalId, email: user.email },
      process.env.JWT_ENCRYPTION,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.status(200).json({ token, loggedUser: user.externalId });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Retrieve user data by externalId
export const getUser = async (req, res) => {
  const { externalId } = req.params;

  try {
    const user = await userService.getUser(externalId);
    const userResponse = {
      externalId: user.externalId,
      name: user.name,
      email: user.email,
    };
    res.status(200).json({ user: userResponse });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Update user profile
export const updateUser = async (req, res) => {
  const { externalId } = req.params;
  const updatedData = req.body;

  try {
    await userService.updateUser(updatedData, externalId);
    res.status(200).json({ message: updatedData });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Delete user (if this route is ever used)
export const deleteUser = async (req, res) => {
  const { externalId } = req.params;

  try {
    await userService.deleteUser(externalId);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};
