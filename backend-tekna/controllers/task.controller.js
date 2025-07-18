import * as taskService from "../services/task.service.js";
import * as userService from "../services/user.service.js";

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, expirationAt, externalId } = req.body;

  try {
    const expirationDate = new Date(expirationAt).toISOString();
    const user = await userService.getUser(externalId);
    await taskService.createTask(title, description, expirationDate, user.id);

    res.status(201).json({ message: "Task successfully created" });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Get paginated and filtered tasks
export const getAllTasks = async (req, res) => {
  const { externalId, page, orderBy, orderDirection, finished, title } = req.params;

  try {
    let finishedValue;
    if (finished === "finished") finishedValue = true;
    else if (finished === "pending") finishedValue = false;

    const user = await userService.getUser(externalId);
    const tasks = await taskService.getAllTasks(
      user.id,
      Number(page) || 1,
      orderBy,
      orderDirection,
      finishedValue,
      title
    );

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Get all tasks from a specific user by externalId
export const getTasks = async (req, res) => {
  const { userId, externalId } = req.params;

  try {
    const user = await userService.getUser(userId);
    const tasks = await taskService.getTasks(user.id, externalId);

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Update a task by its externalId
export const updateTask = async (req, res) => {
  const { externalId } = req.params;
  const taskData = req.body;

  try {
    await taskService.updateTask(externalId, taskData);
    res.status(200).json({ message: "Task successfully updated" });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};

// Delete a task by externalId
export const deleteTask = async (req, res) => {
  const { externalId } = req.params;

  try {
    await taskService.deleteTask(externalId);
    res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message || error });
  }
};
