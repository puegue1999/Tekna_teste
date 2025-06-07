import * as taskService from "../services/task.service.js";
import * as userService from "../services/user.service.js";

export const createTask = async (req, res) => {
  const { title, description, expirationAt, externalId } = req.body;

  try {
    const user = await userService.getUser(externalId);
    await taskService.createTask(title, description, expirationAt, user.id);
    res.status(201).json({ message: "Task criada com sucesso" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getAllTasks = async (req, res) => {
  const { userId } = req.params;

  try {
    const allTasks = await taskService.getAllTasks(userId);
    res.status(201).json({ message: allTasks });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateTask = async (req, res) => {
  const { userId, externalId } = req.params;
  const taskRequest = req.body;

  try {
    await taskService.updateTask(userId, externalId, taskRequest);
    res.status(201).json({ message: userRequest });
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
