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
      external_id: true,
      password: true
    },
    where: {
      email: email,
      deletedAt: null
    }
  })
};

export const viewUser = async (externalId) => {
  return prisma.users.findFirst({
    select: {
      external_id: true,
      name: true,
      email: true,
      password: true,
    },
    where: {
      external_id: externalId
    }
  })
};

export const updateUser = async (user, externalId) => {
  return prisma.users.update({
    where: {
      external_id: externalId,
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
      external_id: externalId
    },
    data:{
      deletedAt: new Date()
    }
  })
};