import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DATABASE_URL"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const isProduction = (process.env.NODE_ENV ?? "development") === "production";

function getEnvValue(
  key: string,
  fallback: string,
  options?: { productionOnly?: boolean }
): string {
  const value = process.env[key];

  if (value) {
    return value;
  }

  if (options?.productionOnly && isProduction) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return fallback;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction,
  port: Number(process.env.PORT ?? 5050),
  appBaseUrl: process.env.APP_BASE_URL ?? "http://localhost:5050",
  clientBaseUrl: process.env.CLIENT_BASE_URL ?? "http://localhost:3000",
  databaseUrl: process.env.DATABASE_URL as string,
  corsOrigin: process.env.CORS_ORIGIN?.split(",").map((origin) => origin.trim()) ?? [
    "http://localhost:3000"
  ],
  accessTokenSecret: getEnvValue(
    "ACCESS_TOKEN_SECRET",
    "development-access-secret-change-me",
    { productionOnly: true }
  ),
  refreshTokenSecret: getEnvValue(
    "REFRESH_TOKEN_SECRET",
    "development-refresh-secret-change-me",
    { productionOnly: true }
  ),
  emailVerificationTokenSecret: getEnvValue(
    "EMAIL_VERIFICATION_TOKEN_SECRET",
    process.env.ACCESS_TOKEN_SECRET ?? "development-email-verification-secret-change-me",
    { productionOnly: true }
  ),
  passwordResetTokenSecret: getEnvValue(
    "PASSWORD_RESET_TOKEN_SECRET",
    process.env.REFRESH_TOKEN_SECRET ?? "development-password-reset-secret-change-me",
    { productionOnly: true }
  ),
  accessTokenTtlMinutes: Number(process.env.ACCESS_TOKEN_TTL_MINUTES ?? 15),
  refreshTokenTtlDays: Number(process.env.REFRESH_TOKEN_TTL_DAYS ?? 30),
  emailVerificationTtlHours: Number(
    process.env.EMAIL_VERIFICATION_TTL_HOURS ?? 24
  ),
  passwordResetTtlMinutes: Number(process.env.PASSWORD_RESET_TTL_MINUTES ?? 30),
  plunkApiKey: process.env.PLUNK_API_KEY ?? "",
  refreshCookieName: process.env.REFRESH_COOKIE_NAME ?? "ae_refresh_token"
} as const;
