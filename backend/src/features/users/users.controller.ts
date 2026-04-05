import { NextFunction, Request, Response } from "express";

import { usersService } from "./users.service";

export const usersController = {
  listUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.getAllUsers();

      return res.status(200).json({
        message: "Users fetched successfully.",
        data: users
      });
    } catch (error) {
      return next(error);
    }
  },

  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as { name?: string; email?: string };

      if (!name || !email) {
        return res.status(400).json({
          message: "Both name and email are required."
        });
      }

      const createdUser = await usersService.createUser({ name, email });

      return res.status(201).json({
        message: "User created successfully.",
        data: createdUser
      });
    } catch (error) {
      if (usersService.isDuplicateEmailError(error)) {
        return res.status(409).json({
          message: "This email is already in use."
        });
      }

      return next(error);
    }
  }
};
