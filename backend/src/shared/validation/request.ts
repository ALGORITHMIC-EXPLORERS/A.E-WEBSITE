import { AppError } from "../errors/app-error";

export function requireString(
  value: unknown,
  field: string,
  options?: { minLength?: number; maxLength?: number }
): string {
  if (typeof value !== "string") {
    throw new AppError(400, `${field} must be a string.`, "VALIDATION_ERROR");
  }

  const normalized = value.trim();

  if (!normalized) {
    throw new AppError(400, `${field} is required.`, "VALIDATION_ERROR");
  }

  if (options?.minLength && normalized.length < options.minLength) {
    throw new AppError(
      400,
      `${field} must be at least ${options.minLength} characters.`,
      "VALIDATION_ERROR"
    );
  }

  if (options?.maxLength && normalized.length > options.maxLength) {
    throw new AppError(
      400,
      `${field} must not exceed ${options.maxLength} characters.`,
      "VALIDATION_ERROR"
    );
  }

  return normalized;
}

export function optionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  return normalized || undefined;
}

export function requireEmail(value: unknown, field = "email"): string {
  const email = requireString(value, field, { maxLength: 320 }).toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new AppError(400, `${field} must be a valid email address.`, "VALIDATION_ERROR");
  }

  return email;
}

export function requirePassword(value: unknown, field = "password"): string {
  const password = requireString(value, field, { minLength: 12, maxLength: 128 });

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (!hasUpper || !hasLower || !hasDigit || !hasSymbol) {
    throw new AppError(
      400,
      `${field} must include uppercase, lowercase, number, and symbol characters.`,
      "VALIDATION_ERROR"
    );
  }

  return password;
}

export function requireBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new AppError(400, `${field} must be a boolean.`, "VALIDATION_ERROR");
  }

  return value;
}

export function optionalBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

export function optionalNumber(value: unknown, field: string): number | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const numeric = Number(value);

  if (Number.isNaN(numeric)) {
    throw new AppError(400, `${field} must be a valid number.`, "VALIDATION_ERROR");
  }

  return numeric;
}

export function requireArray<T>(value: unknown, field: string): T[] {
  if (!Array.isArray(value)) {
    throw new AppError(400, `${field} must be an array.`, "VALIDATION_ERROR");
  }

  return value as T[];
}

export function requireParam(value: string | string[] | undefined, field: string): string {
  if (Array.isArray(value)) {
    if (!value[0]) {
      throw new AppError(400, `${field} parameter is required.`, "VALIDATION_ERROR");
    }

    return value[0];
  }

  return requireString(value, field);
}
