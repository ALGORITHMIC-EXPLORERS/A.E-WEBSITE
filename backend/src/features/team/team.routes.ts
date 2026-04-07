import { Router } from "express";

import { teamController } from "./team.controller";

const publicTeamRouter = Router();
publicTeamRouter.get("/", teamController.listPublic);

const adminTeamRouter = Router();
adminTeamRouter.get("/", teamController.listAdmin);
adminTeamRouter.get("/:teamMemberId", teamController.getOne);
adminTeamRouter.post("/", teamController.create);
adminTeamRouter.patch("/:teamMemberId", teamController.update);
adminTeamRouter.delete("/:teamMemberId", teamController.delete);

export { adminTeamRouter, publicTeamRouter };
