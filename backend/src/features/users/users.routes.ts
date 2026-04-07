import { Router } from "express";

import { usersController } from "./users.controller";

const usersRouter = Router();

usersRouter.get("/", usersController.listUsers);
usersRouter.get("/:userId", usersController.getUser);
usersRouter.patch("/:userId/access", usersController.updateUserAccess);

export { usersRouter };
