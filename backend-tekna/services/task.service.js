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

export const getAllTasks = async (
  userId,
  page = 1,
  orderBy = "title",
  orderDirection = "asc",
  finished,
  title
) => {
  const whereClause = {
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
    where: whereClause,
    orderBy: {
      [orderBy]: orderDirection,
    },
    take: 7,
    skip: (page - 1) * 7,
  });

  const total = await prisma.tasks.count({
    where: whereClause,
  });

  return {
    tasks,
    total,
    page,
    perPage: 7,
    totalPages: Math.ceil(total / 7),
  };
};

export const updateTask = async (externalId, task) => {
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

export const deleteTask = async (externalId) => {
  return prisma.tasks.update({
    where: {
      externalId: externalId,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};
