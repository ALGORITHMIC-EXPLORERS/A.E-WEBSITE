import { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response): Response {
  return res.status(404).json({
    status: "error",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    data: {
      code: "ROUTE_NOT_FOUND"
    }
  });
}
