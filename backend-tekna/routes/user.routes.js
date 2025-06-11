import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const userRouter = Router();

userRouter.post('/auth/register', userController.createUser);
userRouter.post('/auth/login', userController.loginUser);
userRouter.get('/:externalId', authenticateToken, userController.getUser);
userRouter.patch('/:externalId', authenticateToken, userController.updateUser);

export default userRouter;
