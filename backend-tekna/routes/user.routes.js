import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const userRouter = Router();

userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.loginUser);
userRouter.patch('/:externalId', authenticateToken, userController.updateUser);

export default userRouter;
