import { prisma } from "../lib/prismaClient.js";

/**
 * Creates a new user in the database.
 */
export const createUser = async (name, email, password) => {
  return prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
};

/**
 * Retrieves user by email for login purposes.
 */
export const findUserByEmail = async (email) => {
  return prisma.users.findFirst({
    select: {
      externalId: true,
      password: true,
      email: true,
    },
    where: {
      email,
      deletedAt: null,
    },
  });
};

/**
 * Retrieves user details by external ID.
 */
export const getUserByExternalId = async (externalId) => {
  return prisma.users.findFirst({
    select: {
      id: true,
      externalId: true,
      name: true,
      email: true,
      password: true,
    },
    where: {
      externalId,
    },
  });
};

/**
 * Updates a user based on external ID.
 */
export const updateUser = async (userData, externalId) => {
  return prisma.users.update({
    where: {
      externalId,
      deletedAt: null,
    },
    data: {
      name: userData.name,
      email: userData.email,
      updatedAt: new Date(),
    },
  });
};

/**
 * Soft deletes a user by setting deletedAt timestamp.
 */
export const deleteUser = async (externalId) => {
  return prisma.users.update({
    where: { externalId },
    data: {
      deletedAt: new Date(),
    },
  });
};
