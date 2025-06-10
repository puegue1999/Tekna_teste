import { prisma } from "../lib/prismaClient.js";

export const createUser = async (name, email, password) => {
  return prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const loginUser = async (email) => {
  return prisma.users.findFirst({
    select: {
      externalId: true,
      password: true,
      email: true
    },
    where: {
      email: email,
      deletedAt: null
    }
  })
};

export const getUser = async (externalId) => {
  return prisma.users.findFirst({
    select: {
      id: true,
      externalId: true,
      name: true,
      email: true,
      password: true,
    },
    where: {
      externalId: externalId
    }
  })
};

export const updateUser = async (user, externalId) => {
  return prisma.users.update({
    where: {
      externalId: externalId,
      deletedAt: null
    },
    data:{
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date()
    }
  })
};

export const deleteUser = async (externalId) => {
  return prisma.users.update({
    where: {
      externalId: externalId
    },
    data:{
      deletedAt: new Date()
    }
  })
};