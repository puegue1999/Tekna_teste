import { prisma } from "../lib/prismaClient.js";

export const loginUser = async (email) => {
  return await prisma.users.findFirst({
    select: {
      external_id: true,
      password: true
    },
    where: {
      email: email
    }
  })
};

export const createUser = async (name, email, password) => {
  return await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
};
