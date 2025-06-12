import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticateToken } from "../controllers/auth.controller.js";

const userRouter = Router();

// Register new user
userRouter.post("/auth/register", userController.createUser);

// Login existing user
userRouter.post("/auth/login", userController.loginUser);

// Get user profile
userRouter.get("/:externalId", authenticateToken, userController.getUser);

// Update user profile
userRouter.patch("/:externalId", authenticateToken, userController.updateUser);

export default userRouter;
