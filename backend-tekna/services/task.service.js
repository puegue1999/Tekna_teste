import { prisma } from "../lib/prismaClient.js";

/**
 * Creates a new task for a given user.
 */
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

/**
 * Retrieves a specific task by user and external task ID.
 */
export const getTaskByUserAndId = async (userId, externalId) => {
  return prisma.tasks.findFirst({
    select: {
      title: true,
      description: true,
      expirationAt: true,
      finished: true,
    },
    where: {
      userId,
      externalId,
    },
  });
};

/**
 * Retrieves all tasks for a user with optional filters and pagination.
 */
export const getAllTasks = async (
  userId,
  page = 1,
  orderBy = "title",
  orderDirection = "asc",
  finished,
  title
) => {
  const filters = {
    userId,
    deletedAt: null,
    ...(finished !== undefined && { finished }),
    ...(title &&
      title !== "all" && {
        title: {
          contains: title,
          mode: "insensitive",
        },
      }),
  };

  const tasks = await prisma.tasks.findMany({
    select: {
      externalId: true,
      title: true,
      description: true,
      expirationAt: true,
      finished: true,
    },
    where: filters,
    orderBy: {
      [orderBy]: orderDirection,
    },
    take: 7,
    skip: (page - 1) * 7,
  });

  const total = await prisma.tasks.count({ where: filters });

  return {
    tasks,
    total,
    page,
    perPage: 7,
    totalPages: Math.ceil(total / 7),
  };
};

/**
 * Updates a task by its external ID.
 */
export const updateTask = async (externalId, updatedData) => {
  return prisma.tasks.update({
    where: { externalId },
    data: {
      title: updatedData.title,
      description: updatedData.description,
      expirationAt: new Date(updatedData.expirationAt),
      finished: updatedData.finished,
      updatedAt: new Date(),
    },
  });
};

/**
 * Soft deletes a task by setting deletedAt timestamp.
 */
export const deleteTask = async (externalId) => {
  return prisma.tasks.update({
    where: { externalId },
    data: {
      deletedAt: new Date(),
    },
  });
};
