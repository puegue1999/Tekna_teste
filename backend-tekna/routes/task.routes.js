import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";
import { authenticateToken } from "../controllers/auth.controller.js";

const taskRouter = Router();

// Create a new task
taskRouter.post("/", authenticateToken, taskController.createTask);

// Get filtered and paginated tasks
taskRouter.get(
  "/:externalId/:page/:orderBy/:orderDirection/:finished/:title",
  authenticateToken,
  taskController.getAllTasks
);

// Get all tasks for a user
taskRouter.get(
  "/:userId/:externalId",
  authenticateToken,
  taskController.getTasks
);

// Update a task
taskRouter.patch(
  "/:userId/:externalId",
  authenticateToken,
  taskController.updateTask
);

// Delete a task
taskRouter.delete("/:externalId", authenticateToken, taskController.deleteTask);

export default taskRouter;
