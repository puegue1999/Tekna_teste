import { prisma } from "../lib/prismaClient.js";

export const createTask = async (title, description, expirationAt, userId) => {
  return prisma.tasks.create({
    data: {
      title,
      description,
      expirationAt,
      userId,
    },
  });
};

export const getTasks = async (userId, externalId) => {
  return prisma.tasks.findFirst({
    select: {
      title: true,
      description: true,
      expirationAt: true,
      finished: true,
    },
    where: {
      externalId: externalId,
      userId: userId,
    },
  });
};

export const getAllTasks = async (userId) => {
  return prisma.tasks.findMany({
    select: {
      externalId: true,
      title: true,
      description: true,
      expirationAt: true,
      finished: true,
    },
    where: {
      userId: userId,
      deletedAt: null,
    },
  });
};

export const updateTask = async (userId, externalId, task) => {
  return prisma.tasks.update({
    where: {
      externalId: externalId,
    },
    data: {
      title: task.title,
      description: task.description,
      expirationAt: new Date(task.expirationAt),
      finished: task.finished,
      updatedAt: new Date(),
    },
  });
};

export const deleteTask = async (userId, externalId) => {
  return prisma.tasks.update({
    where: {
      external_id: externalId,
      userId: userId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
