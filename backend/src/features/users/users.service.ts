import { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma-client";

export interface CreateUserInput {
  name: string;
  email: string;
}

export const usersService = {
  getAllUsers: async () => {
    return prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });
  },

  createUser: async (input: CreateUserInput) => {
    return prisma.user.create({
      data: input
    });
  },

  isDuplicateEmailError: (error: unknown) => {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    );
  }
};
