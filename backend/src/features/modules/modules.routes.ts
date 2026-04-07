import { Router } from "express";

import { modulesController } from "./modules.controller";

const publicModulesRouter = Router();
publicModulesRouter.get("/", modulesController.listPublicModules);
publicModulesRouter.get("/:slug", modulesController.getPublicModule);

const learnerModulesRouter = Router();
learnerModulesRouter.get("/", modulesController.listMyModules);
learnerModulesRouter.get("/:slug", modulesController.getMyModuleDetail);
learnerModulesRouter.patch("/:moduleId/progress", modulesController.updateProgress);

const adminModulesRouter = Router();
adminModulesRouter.get("/", modulesController.listAdminModules);
adminModulesRouter.get("/:moduleId", modulesController.getAdminModule);
adminModulesRouter.post("/", modulesController.createModule);
adminModulesRouter.patch("/:moduleId", modulesController.updateModule);
adminModulesRouter.delete("/:moduleId", modulesController.deleteModule);

export { adminModulesRouter, learnerModulesRouter, publicModulesRouter };
