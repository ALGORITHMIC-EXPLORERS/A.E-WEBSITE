import { NextFunction, Request, Response } from "express";

import { env } from "../config/env";
import { AppError } from "../shared/errors/app-error";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      data: {
        code: error.code,
        details: error.details ?? null
      }
    });
  }

  console.error("Unhandled server error:", error);

  const errorData: Record<string, unknown> = {
    code: "INTERNAL_SERVER_ERROR"
  };

  if (env.nodeEnv === "development" && error instanceof Error) {
    errorData.stack = error.stack;
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again.",
    data: errorData
  });
}
