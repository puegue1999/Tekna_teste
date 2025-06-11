import { Router } from 'express';
import * as taskController from '../controllers/task.controller.js';
import { authenticateToken } from '../controllers/auth.controller.js';

const taskRouter = Router();

taskRouter.post('/', authenticateToken, taskController.createTask);
taskRouter.get('/:externalId/:page/:orderBy/:orderDirection/:finished/:title', authenticateToken, taskController.getAllTasks);
taskRouter.get('/:userId/:externalId', authenticateToken, taskController.getTasks);
taskRouter.patch('/:userId/:externalId', authenticateToken, taskController.updateTask);
taskRouter.delete('/:externalId', authenticateToken, taskController.deleteTask);

export default taskRouter;
