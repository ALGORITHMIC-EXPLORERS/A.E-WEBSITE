import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/async-handler";
import { optionalNumber } from "../../shared/validation/request";
import { leaderboardService } from "./leaderboard.service";

export const leaderboardController = {
  getLeaderboard: asyncHandler(async (req: Request, res: Response) => {
    const query = req.query as Record<string, unknown>;
    
    const leaderboard = await leaderboardService.getLeaderboard({
      limit: optionalNumber(query.limit, "limit"),
      offset: optionalNumber(query.offset, "offset")
    });

    return res.status(200).json({
      message: "Leaderboard fetched successfully.",
      data: leaderboard
    });
  })
};
