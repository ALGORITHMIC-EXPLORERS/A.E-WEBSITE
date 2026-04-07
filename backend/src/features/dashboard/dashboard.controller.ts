import { Request, Response } from "express";

import { AppError } from "../../shared/errors/app-error";
import { asyncHandler } from "../../shared/utils/async-handler";
import { dashboardService } from "./dashboard.service";

export const dashboardController = {
  getDashboard: asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(401, "Authentication required.", "UNAUTHORIZED");
    }

    const dashboard = await dashboardService.getDashboard({
      userId: req.user.sub
    });

    return res.status(200).json({
      message: "Dashboard fetched successfully.",
      data: dashboard
    });
  })
};
