import * as taskService from "../services/task.service.js";
import * as userService from "../services/user.service.js";

export const createTask = async (req, res) => {
  const { title, description, expirationAt, externalId } = req.body;
  const expirationDate = new Date(expirationAt).toISOString();

  try {
    const user = await userService.getUser(externalId);
    await taskService.createTask(title, description, expirationDate, user.id);
    res.status(201).json({ message: "Task criada com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllTasks = async (req, res) => {
  const { externalId } = req.params;

  try {
    const user = await userService.getUser(externalId);
    const allTasks = await taskService.getAllTasks(user.id);
    res.status(201).json({ allTasks: allTasks });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getTasks = async (req, res) => {
  const { userId, externalId } = req.params;

  try {
    const user = await userService.getUser(userId);
    const allTasks = await taskService.getTasks(user.id, externalId);
    res.status(201).json({ allTasks: allTasks });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateTask = async (req, res) => {
  const { userId, externalId } = req.params;
  const taskRequest = req.body;

  try {
    const user = await userService.getUser(userId);
    await taskService.updateTask(user.id, externalId, taskRequest);
    res.status(201).json({ message: "Updated task" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteTask = async (req, res) => {
  const { userId, externalId } = req.params;

  try {
    await taskService.deleteTask(userId, externalId);

    res.status(201).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
