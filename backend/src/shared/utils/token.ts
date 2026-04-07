import crypto from "crypto";

import { env } from "../../config/env";
import { UserRole, UserStatus } from "../constants/auth";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  sessionId: string;
  type: "access";
  iat: number;
  exp: number;
}

function encode(data: object): string {
  return Buffer.from(JSON.stringify(data)).toString("base64url");
}

function decode<T>(data: string): T {
  return JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as T;
}

function sign(input: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(input).digest("base64url");
}

function timingSafeEqual(a: string, b: string): boolean {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

export function signAccessToken(input: Omit<AccessTokenPayload, "iat" | "exp" | "type">): string {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + env.accessTokenTtlMinutes * 60;

  const header = encode({ alg: "HS256", typ: "JWT" });
  const payload = encode({
    ...input,
    type: "access",
    iat: issuedAt,
    exp: expiresAt
  });

  const signature = sign(`${header}.${payload}`, env.accessTokenSecret);

  return `${header}.${payload}.${signature}`;
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    throw new Error("Malformed access token.");
  }

  const decodedHeader = decode<{ alg?: string; typ?: string }>(header);

  if (decodedHeader.alg !== "HS256" || decodedHeader.typ !== "JWT") {
    throw new Error("Invalid token header.");
  }

  const expectedSignature = sign(`${header}.${payload}`, env.accessTokenSecret);

  if (!timingSafeEqual(signature, expectedSignature)) {
    throw new Error("Invalid access token signature.");
  }

  const decodedPayload = decode<AccessTokenPayload>(payload);

  if (decodedPayload.type !== "access") {
    throw new Error("Invalid access token type.");
  }

  if (decodedPayload.exp * 1000 < Date.now()) {
    throw new Error("Access token expired.");
  }

  return decodedPayload;
}
