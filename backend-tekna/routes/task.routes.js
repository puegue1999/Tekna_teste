import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const taskRouter = Router();

taskRouter.post('/', authenticateToken, taskController.createTask);
taskRouter.get('/:userId', authenticateToken, taskController.getAllTasks);
taskRouter.patch('/:userId/:externalId', authenticateToken, taskController.updateTask);
taskRouter.delete('/:userId/:externalId', authenticateToken, taskController.deleteTask);

export default taskRouter;
