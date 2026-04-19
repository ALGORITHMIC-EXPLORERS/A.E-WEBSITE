import { User, UserStatus } from "@prisma/client";

import { prisma } from "../../config/prisma-client";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";
import { renderResetPasswordEmail } from "../../shared/templates/emails/reset-password-email";
import { renderVerificationEmail } from "../../shared/templates/emails/verification-email";
import {
  generateOpaqueToken,
  hashOpaqueToken,
  hashPassword,
  verifyPassword
} from "../../shared/utils/crypto";
import { sendEmailWithPlunk } from "../../shared/utils/plunk";
import { AccessTokenPayload, signAccessToken } from "../../shared/utils/token";

export interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface AuthenticatedUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: AccessTokenPayload["role"];
  status: AccessTokenPayload["status"];
}

export interface AuthenticationResult {
  user: AuthenticatedUser;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResult {
  user: AuthenticatedUser;
  verificationRequired: boolean;
  verificationEmailSent: boolean;
  canResendVerificationEmail: boolean;
  alreadyExists: boolean;
}

const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password.";

function addHours(hours: number): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

function addMinutes(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

function addDays(days: number): Date {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

function normalizeOptionalMetadata(
  value: string | undefined,
  maxLength: number
): string | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  return normalized.slice(0, maxLength);
}

function toAuthenticatedUser(user: {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: User["role"];
  status: User["status"];
}): AuthenticatedUser {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role as AccessTokenPayload["role"],
    status: user.status as AccessTokenPayload["status"]
  };
}

function ensureUserCanAuthenticate(status: UserStatus): void {
  if (status === "PENDING_VERIFICATION") {
    throw new AppError(
      403,
      "Please verify your email address before logging in.",
      "EMAIL_NOT_VERIFIED",
      {
        resendVerificationEndpoint: "/api/auth/resend-verification"
      }
    );
  }

  if (status === "SUSPENDED" || status === "DEACTIVATED") {
    throw new AppError(403, "Your account is not active.", "ACCOUNT_NOT_ACTIVE");
  }
}

function buildClientUrl(path: string, token: string): string {
  const base = env.clientBaseUrl.replace(/\/$/, "");
  return `${base}${path}?token=${encodeURIComponent(token)}`;
}

async function createAndSendVerificationToken(user: {
  id: string;
  firstName: string;
  email: string;
}): Promise<void> {
  const token = generateOpaqueToken();
  const tokenHash = hashOpaqueToken(token, env.emailVerificationTokenSecret);
  const now = new Date();

  await prisma.$transaction([
    prisma.emailVerificationToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null
      },
      data: {
        usedAt: now
      }
    }),
    prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: addHours(env.emailVerificationTtlHours)
      }
    })
  ]);

  await sendEmailWithPlunk({
    to: user.email,
    subject: "Verify your A.E account",
    body: renderVerificationEmail({
      firstName: user.firstName,
      verificationUrl: buildClientUrl("/verify-email", token)
    })
  });
}

async function trySendVerificationEmail(user: {
  id: string;
  firstName: string;
  email: string;
}): Promise<{ sent: boolean; errorCode?: string }> {
  try {
    await createAndSendVerificationToken(user);
    return { sent: true };
  } catch (error) {
    if (error instanceof AppError) {
      return {
        sent: false,
        errorCode: error.code
      };
    }

    throw error;
  }
}

async function createAuthenticationResult(
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: User["role"];
    status: User["status"];
  },
  metadata: { userAgent?: string; ipAddress?: string }
): Promise<AuthenticationResult> {
  const refreshToken = generateOpaqueToken();
  const refreshTokenHash = hashOpaqueToken(refreshToken, env.refreshTokenSecret);
  const now = new Date();

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      refreshTokenHash,
      userAgent: normalizeOptionalMetadata(metadata.userAgent, 512),
      ipAddress: normalizeOptionalMetadata(metadata.ipAddress, 80),
      expiresAt: addDays(env.refreshTokenTtlDays),
      lastUsedAt: now
    }
  });

  const accessToken = signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role as AccessTokenPayload["role"],
    status: user.status as AccessTokenPayload["status"],
    sessionId: session.id
  });

  return {
    user: toAuthenticatedUser(user),
    accessToken,
    refreshToken
  };
}

export const authService = {
  register: async (input: RegisterInput): Promise<RegisterResult> => {
    // Check both email and username in ONE database query (more efficient)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: input.email },
          { username: input.username }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true, 
        email: true,
        role: true,
        status: true
      }
    });

    if (existingUser) {
      // Check if it's email or username conflict
      if (existingUser.email === input.email) {
        if (existingUser.status !== "PENDING_VERIFICATION") {
          throw new AppError(409, "An account with this email already exists.", "EMAIL_IN_USE");
        }
        const existingUserDelivery = await trySendVerificationEmail(existingUser);
        return {
          user: toAuthenticatedUser(existingUser),
          verificationRequired: true,
          verificationEmailSent: existingUserDelivery.sent,
          canResendVerificationEmail: true,
          alreadyExists: true
        };
      }
      
      // Username conflict
      if (existingUser.username === input.username) {
        throw new AppError(409, "Username already taken.", "USERNAME_IN_USE");
      }
    }

    const passwordHash = await hashPassword(input.password);

    const user = await prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        username: input.username,
        email: input.email,
        passwordHash,
        role: "STUDENT",
        status: "ACTIVE",
        emailVerifiedAt: new Date()
      }
    });

    const delivery = await trySendVerificationEmail(user);

    return {
      user: toAuthenticatedUser(user),
      verificationRequired: false,
      verificationEmailSent: delivery.sent,
      canResendVerificationEmail: true,
      alreadyExists: false
    };
  },

  login: async (input: LoginInput): Promise<AuthenticationResult> => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: input.email },
          { username: input.email }
        ]
      }
    });


    if (!user) {
      throw new AppError(401, INVALID_CREDENTIALS_MESSAGE, "INVALID_CREDENTIALS");
    }

    const passwordMatches = await verifyPassword(input.password, user.passwordHash);

    if (!passwordMatches) {
      throw new AppError(401, INVALID_CREDENTIALS_MESSAGE, "INVALID_CREDENTIALS");
    }

    ensureUserCanAuthenticate(user.status);

    const result = await createAuthenticationResult(user, {
      userAgent: input.userAgent,
      ipAddress: input.ipAddress
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date()
      }
    });

    return result;
  },

  refreshSession: async (input: {
    refreshToken: string;
    userAgent?: string;
    ipAddress?: string;
  }): Promise<AuthenticationResult> => {
    const hashedToken = hashOpaqueToken(input.refreshToken, env.refreshTokenSecret);
    const session = await prisma.session.findUnique({
      where: {
        refreshTokenHash: hashedToken
      },
      include: {
        user: true
      }
    });

    if (!session) {
      throw new AppError(401, "Invalid refresh token.", "UNAUTHORIZED");
    }

    const now = new Date();

    if (session.revokedAt || session.expiresAt.getTime() <= now.getTime()) {
      throw new AppError(401, "Refresh token has expired. Please log in again.", "UNAUTHORIZED");
    }

    ensureUserCanAuthenticate(session.user.status);

    const newRefreshToken = generateOpaqueToken();
    const newRefreshTokenHash = hashOpaqueToken(newRefreshToken, env.refreshTokenSecret);

    await prisma.session.update({
      where: {
        id: session.id
      },
      data: {
        refreshTokenHash: newRefreshTokenHash,
        userAgent: normalizeOptionalMetadata(input.userAgent, 512) ?? session.userAgent,
        ipAddress: normalizeOptionalMetadata(input.ipAddress, 80) ?? session.ipAddress,
        lastUsedAt: now,
        expiresAt: addDays(env.refreshTokenTtlDays)
      }
    });

    const accessToken = signAccessToken({
      sub: session.user.id,
      email: session.user.email,
      role: session.user.role as AccessTokenPayload["role"],
      status: session.user.status as AccessTokenPayload["status"],
      sessionId: session.id
    });

    return {
      user: toAuthenticatedUser(session.user),
      accessToken,
      refreshToken: newRefreshToken
    };
  },

  logout: async (input: { refreshToken: string }): Promise<void> => {
    const refreshTokenHash = hashOpaqueToken(input.refreshToken, env.refreshTokenSecret);

    await prisma.session.updateMany({
      where: {
        refreshTokenHash,
        revokedAt: null
      },
      data: {
        revokedAt: new Date()
      }
    });
  },

  forgotPassword: async (input: { email: string }): Promise<void> => {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      }
    });

    if (!user || user.status === "DEACTIVATED") {
      return;
    }

    const token = generateOpaqueToken();
    const tokenHash = hashOpaqueToken(token, env.passwordResetTokenSecret);
    const now = new Date();

    await prisma.$transaction([
      prisma.passwordResetToken.updateMany({
        where: {
          userId: user.id,
          usedAt: null
        },
        data: {
          usedAt: now
        }
      }),
      prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt: addMinutes(env.passwordResetTtlMinutes)
        }
      })
    ]);

    await sendEmailWithPlunk({
      to: user.email,
      subject: "Reset your A.E password",
      body: renderResetPasswordEmail({
        firstName: user.firstName,
        resetUrl: buildClientUrl("/reset-password", token)
      })
    });
  },

  resetPassword: async (input: { token: string; password: string }): Promise<void> => {
    const tokenHash = hashOpaqueToken(input.token, env.passwordResetTokenSecret);
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: {
        tokenHash
      },
      include: {
        user: true
      }
    });

    if (!tokenRecord) {
      throw new AppError(400, "Invalid or expired password reset token.", "INVALID_TOKEN");
    }

    if (tokenRecord.usedAt || tokenRecord.expiresAt.getTime() < Date.now()) {
      throw new AppError(400, "Invalid or expired password reset token.", "INVALID_TOKEN");
    }

    const newPasswordHash = await hashPassword(input.password);
    const now = new Date();

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: tokenRecord.userId
        },
        data: {
          passwordHash: newPasswordHash
        }
      }),
      prisma.passwordResetToken.update({
        where: {
          id: tokenRecord.id
        },
        data: {
          usedAt: now
        }
      }),
      prisma.passwordResetToken.updateMany({
        where: {
          userId: tokenRecord.userId,
          usedAt: null,
          id: {
            not: tokenRecord.id
          }
        },
        data: {
          usedAt: now
        }
      }),
      prisma.session.updateMany({
        where: {
          userId: tokenRecord.userId,
          revokedAt: null
        },
        data: {
          revokedAt: now
        }
      })
    ]);
  },

  verifyEmail: async (input: { token: string }): Promise<void> => {
    const tokenHash = hashOpaqueToken(input.token, env.emailVerificationTokenSecret);
    const tokenRecord = await prisma.emailVerificationToken.findUnique({
      where: {
        tokenHash
      },
      include: {
        user: true
      }
    });

    if (!tokenRecord) {
      throw new AppError(400, "Invalid or expired verification token.", "INVALID_TOKEN");
    }

    if (tokenRecord.usedAt || tokenRecord.expiresAt.getTime() < Date.now()) {
      throw new AppError(400, "Invalid or expired verification token.", "INVALID_TOKEN");
    }

    const now = new Date();

    await prisma.$transaction([
      prisma.emailVerificationToken.update({
        where: {
          id: tokenRecord.id
        },
        data: {
          usedAt: now
        }
      }),
      prisma.user.update({
        where: {
          id: tokenRecord.userId
        },
        data: {
          status: "ACTIVE",
          emailVerifiedAt: tokenRecord.user.emailVerifiedAt ?? now
        }
      })
    ]);
  },

  resendVerificationEmail: async (input: { email: string }): Promise<void> => {
    const user = await prisma.user.findUnique({
      where: {
        email: input.email
      }
    });

    if (!user) {
      return;
    }

    if (user.status === "ACTIVE" && user.emailVerifiedAt) {
      return;
    }

    await createAndSendVerificationToken(user);
  },

  getProfile: async (input: { userId: string }): Promise<AuthenticatedUser> => {
    const user = await prisma.user.findUnique({
      where: {
        id: input.userId
      }
    });

    if (!user) {
      throw new AppError(404, "User not found.", "NOT_FOUND");
    }

    return toAuthenticatedUser(user);
  },

  changePassword: async (input: {
    userId: string;
    currentPassword: string;
    newPassword: string;
   }): Promise<void> => {
    if (input.currentPassword === input.newPassword) {
      throw new AppError(
        400,
        "newPassword must be different from currentPassword.",
        "VALIDATION_ERROR"
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: input.userId
      }
    });

    if (!user) {
      throw new AppError(404, "User not found.", "NOT_FOUND");
    }

    const currentPasswordMatches = await verifyPassword(
      input.currentPassword,
      user.passwordHash
    );

    if (!currentPasswordMatches) {
      throw new AppError(401, "Current password is incorrect.", "INVALID_CREDENTIALS");
    }

    const newPasswordHash = await hashPassword(input.newPassword);
    const now = new Date();

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: input.userId
        },
        data: {
          passwordHash: newPasswordHash
        }
      }),
      prisma.session.updateMany({
        where: {
          userId: input.userId,
          revokedAt: null
        },
        data: {
          revokedAt: now
        }
      }),
      prisma.passwordResetToken.updateMany({
        where: {
          userId: input.userId,
          usedAt: null
        },
        data: {
          usedAt: now
        }
      })
    ]);
  }
};
