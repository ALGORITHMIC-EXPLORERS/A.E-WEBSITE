import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/async-handler";
import { leaderboardService } from "./leaderboard.service";

export const leaderboardController = {
  getLeaderboard: asyncHandler(async (_req: Request, res: Response) => {
    const leaderboard = await leaderboardService.getLeaderboard();

    return res.status(200).json({
      message: "Leaderboard fetched successfully.",
      data: leaderboard
    });
  })
};
