import { Router } from "express";

import { usersController } from "./users.controller";

const usersRouter = Router();

usersRouter.get("/", usersController.listUsers);
usersRouter.post("/", usersController.createUser);

export { usersRouter };
