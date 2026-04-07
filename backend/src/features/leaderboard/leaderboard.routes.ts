import { Router } from "express";

import { leaderboardController } from "./leaderboard.controller";

const leaderboardRouter = Router();

leaderboardRouter.get("/", leaderboardController.getLeaderboard);

export { leaderboardRouter };
