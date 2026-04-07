import { Router } from "express";

import { authenticate, authorize } from "../middlewares/auth";
import { authRouter } from "../features/auth/auth.routes";
import { dashboardRouter } from "../features/dashboard/dashboard.routes";
import { leaderboardRouter } from "../features/leaderboard/leaderboard.routes";
import {
  adminModulesRouter,
  learnerModulesRouter,
  publicModulesRouter
} from "../features/modules/modules.routes";
import {
  adminProductsRouter,
  publicProductsRouter
} from "../features/products/products.routes";
import {
  adminQuizzesRouter,
  learnerQuizzesRouter
} from "../features/quizzes/quizzes.routes";
import {
  adminTestimonialsRouter,
  publicTestimonialsRouter
} from "../features/testimonials/testimonials.routes";
import { adminTeamRouter, publicTeamRouter } from "../features/team/team.routes";
import { usersRouter } from "../features/users/users.routes";

const apiRouter = Router();
const adminRouter = Router();

apiRouter.get("/health", (_req, res) => {
  return res.status(200).json({
    message: "Server is healthy."
  });
});

apiRouter.use("/auth", authRouter);

apiRouter.use("/public/modules", publicModulesRouter);
apiRouter.use("/public/products", publicProductsRouter);
apiRouter.use("/public/testimonials", publicTestimonialsRouter);
apiRouter.use("/public/team", publicTeamRouter);
apiRouter.use("/leaderboard", leaderboardRouter);

apiRouter.use(authenticate);
apiRouter.use("/dashboard", dashboardRouter);
apiRouter.use("/modules", learnerModulesRouter);
apiRouter.use("/quizzes", learnerQuizzesRouter);

adminRouter.use(authorize("ADMIN", "SUPER_ADMIN"));
adminRouter.use("/modules", adminModulesRouter);
adminRouter.use("/quizzes", adminQuizzesRouter);
adminRouter.use("/products", adminProductsRouter);
adminRouter.use("/testimonials", adminTestimonialsRouter);
adminRouter.use("/team", adminTeamRouter);
adminRouter.use("/users", usersRouter);

apiRouter.use("/admin", adminRouter);

export { apiRouter };
