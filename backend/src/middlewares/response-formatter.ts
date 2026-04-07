import { NextFunction, Request, Response } from "express";

type ApiStatus = "success" | "error";

interface ApiResponseBody {
  status: ApiStatus;
  message: string;
  data: unknown;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isApiResponseBody(value: unknown): value is ApiResponseBody {
  if (!isObject(value)) {
    return false;
  }

  return (
    (value.status === "success" || value.status === "error") &&
    typeof value.message === "string" &&
    Object.prototype.hasOwnProperty.call(value, "data")
  );
}

export function responseFormatter(
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  const originalJson = res.json.bind(res);

  res.json = ((body: unknown) => {
    if (isApiResponseBody(body)) {
      return originalJson(body);
    }

    const isErrorResponse = res.statusCode >= 400;

    if (isObject(body)) {
      const message =
        typeof body.message === "string"
          ? body.message
          : isErrorResponse
            ? "Request failed."
            : "Request completed successfully.";

      if (isErrorResponse) {
        const errorData: Record<string, unknown> = {};

        if (Object.prototype.hasOwnProperty.call(body, "code")) {
          errorData.code = body.code;
        }

        if (Object.prototype.hasOwnProperty.call(body, "details")) {
          errorData.details = body.details;
        }

        if (Object.prototype.hasOwnProperty.call(body, "stack")) {
          errorData.stack = body.stack;
        }

        const normalizedData =
          Object.keys(errorData).length > 0
            ? errorData
            : (Object.prototype.hasOwnProperty.call(body, "data")
                ? body.data
                : null);

        return originalJson({
          status: "error",
          message,
          data: normalizedData
        });
      }

      const normalizedData = Object.prototype.hasOwnProperty.call(body, "data")
        ? body.data
        : null;

      return originalJson({
        status: "success",
        message,
        data: normalizedData
      });
    }

    return originalJson({
      status: isErrorResponse ? "error" : "success",
      message: isErrorResponse ? "Request failed." : "Request completed successfully.",
      data: body ?? null
    });
  }) as unknown as Response["json"];

  next();
}