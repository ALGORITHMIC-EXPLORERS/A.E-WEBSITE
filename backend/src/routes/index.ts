import { Router } from "express";

import { usersRouter } from "../features/users/users.routes";

const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  return res.status(200).json({
    message: "Server is healthy."
  });
});

apiRouter.use("/users", usersRouter);

export { apiRouter };
