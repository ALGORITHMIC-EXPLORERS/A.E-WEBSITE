import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  console.error("Unhandled server error:", error);

  return res.status(500).json({
    message: "Something went wrong. Please try again."
  });
}
