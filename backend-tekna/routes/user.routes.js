import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', userController.createUser);
userRouter.get('/login', userController.loginUser);
userRouter.patch('/:externalId', userController.updateUser);

export default userRouter;
