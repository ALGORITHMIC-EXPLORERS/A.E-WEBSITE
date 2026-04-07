import { env } from "../config/env";

const standardResponses = {
  SuccessResponse: {
    description: "Successful response",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiSuccessResponse"
        }
      }
    }
  },
  CreatedResponse: {
    description: "Resource created successfully",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiSuccessResponse"
        }
      }
    }
  },
  ErrorResponse: {
    description: "Error response",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiErrorResponse"
        }
      }
    }
  },
  UnauthorizedResponse: {
    description: "Authentication required or invalid credentials",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiErrorResponse"
        }
      }
    }
  },
  ForbiddenResponse: {
    description: "Forbidden",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ApiErrorResponse"
        }
      }
    }
  }
} as const;

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "AE Website Backend API",
    version: "1.0.0",
    description:
      "Interactive API documentation for AE backend. All responses follow the format: status, message, data."
  },
  servers: [
    {
      url: env.appBaseUrl,
      description: "Current backend server"
    },
    {
      url: "http://localhost:5000",
      description: "Local development"
    }
  ],
  tags: [
    { name: "System", description: "Health and system endpoints" },
    { name: "Auth", description: "Authentication and account security" },
    { name: "Public", description: "Publicly accessible content" },
    { name: "Learner", description: "Authenticated learner endpoints" },
    {
      name: "Admin",
      description: "Role-protected endpoints (requires ADMIN or SUPER_ADMIN)"
    }
  ],
  paths: {
    "/": {
      get: {
        tags: ["System"],
        summary: "Backend welcome endpoint",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/health": {
      get: {
        tags: ["System"],
        summary: "Health check",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register a new account",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest"
              }
            }
          }
        },
        responses: {
          "201": { $ref: "#/components/responses/CreatedResponse" },
          "409": { $ref: "#/components/responses/ErrorResponse" },
          "400": { $ref: "#/components/responses/ErrorResponse" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login and get access token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest"
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "401": { $ref: "#/components/responses/UnauthorizedResponse" },
          "403": { $ref: "#/components/responses/ForbiddenResponse" }
        }
      }
    },
    "/api/auth/refresh": {
      post: {
        tags: ["Auth"],
        summary: "Refresh access token",
        description:
          "Uses refresh token from cookie by default. You can also pass refreshToken in request body.",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshRequest"
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "401": { $ref: "#/components/responses/UnauthorizedResponse" }
        }
      }
    },
    "/api/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout and revoke session",
        security: [{ cookieAuth: [] }, { bearerAuth: [] }],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshRequest"
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/auth/forgot-password": {
      post: {
        tags: ["Auth"],
        summary: "Request a password reset email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/auth/reset-password": {
      post: {
        tags: ["Auth"],
        summary: "Reset password with token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResetPasswordRequest"
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "400": { $ref: "#/components/responses/ErrorResponse" }
        }
      }
    },
    "/api/auth/verify-email": {
      post: {
        tags: ["Auth"],
        summary: "Verify account email",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["token"],
                properties: {
                  token: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "400": { $ref: "#/components/responses/ErrorResponse" }
        }
      }
    },
    "/api/auth/resend-verification": {
      post: {
        tags: ["Auth"],
        summary: "Resend email verification",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email" }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Get current user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "401": { $ref: "#/components/responses/UnauthorizedResponse" }
        }
      }
    },
    "/api/auth/change-password": {
      post: {
        tags: ["Auth"],
        summary: "Change password",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ChangePasswordRequest"
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "401": { $ref: "#/components/responses/UnauthorizedResponse" }
        }
      }
    },

    "/api/public/modules": {
      get: {
        tags: ["Public"],
        summary: "List published modules",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/public/modules/{slug}": {
      get: {
        tags: ["Public"],
        summary: "Get a public module by slug",
        parameters: [
          {
            in: "path",
            name: "slug",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/public/products": {
      get: {
        tags: ["Public"],
        summary: "List published products",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/public/products/{slug}": {
      get: {
        tags: ["Public"],
        summary: "Get a public product by slug",
        parameters: [
          {
            in: "path",
            name: "slug",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/public/testimonials": {
      get: {
        tags: ["Public"],
        summary: "List approved testimonials",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      post: {
        tags: ["Public"],
        summary: "Submit a testimonial",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "content"],
                properties: {
                  name: { type: "string" },
                  title: { type: "string" },
                  company: { type: "string" },
                  content: { type: "string" },
                  rating: { type: "number" }
                }
              }
            }
          }
        },
        responses: {
          "201": { $ref: "#/components/responses/CreatedResponse" },
          "400": { $ref: "#/components/responses/ErrorResponse" }
        }
      }
    },
    "/api/public/team": {
      get: {
        tags: ["Public"],
        summary: "List public team members",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/leaderboard": {
      get: {
        tags: ["Public"],
        summary: "Get leaderboard",
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/dashboard": {
      get: {
        tags: ["Learner"],
        summary: "Get learner dashboard",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "401": { $ref: "#/components/responses/UnauthorizedResponse" }
        }
      }
    },
    "/api/modules": {
      get: {
        tags: ["Learner"],
        summary: "List learner modules",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/modules/{slug}": {
      get: {
        tags: ["Learner"],
        summary: "Get learner module detail",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "slug",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/modules/{moduleId}/progress": {
      patch: {
        tags: ["Learner"],
        summary: "Update learner module progress",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "moduleId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]
                  },
                  progressPercent: { type: "number" }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/quizzes/{quizId}": {
      get: {
        tags: ["Learner"],
        summary: "Get learner quiz",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "quizId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/quizzes/{quizId}/submit": {
      post: {
        tags: ["Learner"],
        summary: "Submit learner quiz",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "quizId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["answers"],
                properties: {
                  answers: {
                    type: "array",
                    items: {
                      type: "object",
                      required: ["questionId"],
                      properties: {
                        questionId: { type: "string" },
                        selectedOptionId: { type: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/admin/modules": {
      get: {
        tags: ["Admin"],
        summary: "List modules (admin)",
        description: "Requires bearer token with ADMIN or SUPER_ADMIN role.",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" },
          "403": { $ref: "#/components/responses/ForbiddenResponse" }
        }
      },
      post: {
        tags: ["Admin"],
        summary: "Create module (admin)",
        description: "Requires bearer token with ADMIN or SUPER_ADMIN role.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModuleUpsertRequest" }
            }
          }
        },
        responses: {
          "201": { $ref: "#/components/responses/CreatedResponse" }
        }
      }
    },
    "/api/admin/modules/{moduleId}": {
      get: {
        tags: ["Admin"],
        summary: "Get module by id (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "moduleId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      patch: {
        tags: ["Admin"],
        summary: "Update module (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "moduleId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModuleUpsertRequest" }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      delete: {
        tags: ["Admin"],
        summary: "Delete module (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "moduleId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/admin/quizzes": {
      get: {
        tags: ["Admin"],
        summary: "List quizzes (admin)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      post: {
        tags: ["Admin"],
        summary: "Create quiz (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/QuizUpsertRequest" }
            }
          }
        },
        responses: {
          "201": { $ref: "#/components/responses/CreatedResponse" }
        }
      }
    },
    "/api/admin/quizzes/{quizId}": {
      get: {
        tags: ["Admin"],
        summary: "Get quiz by id (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "quizId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      patch: {
        tags: ["Admin"],
        summary: "Update quiz (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "quizId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/QuizUpsertRequest" }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      delete: {
        tags: ["Admin"],
        summary: "Delete quiz (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "quizId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/admin/products": {
      get: {
        tags: ["Admin"],
        summary: "List products (admin)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      post: {
        tags: ["Admin"],
        summary: "Create product (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductUpsertRequest" }
            }
          }
        },
        responses: {
          "201": { $ref: "#/components/responses/CreatedResponse" }
        }
      }
    },
    "/api/admin/products/{productId}": {
      get: {
        tags: ["Admin"],
        summary: "Get product by id (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      patch: {
        tags: ["Admin"],
        summary: "Update product (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProductUpsertRequest" }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      delete: {
        tags: ["Admin"],
        summary: "Delete product (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "productId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/admin/testimonials": {
      get: {
        tags: ["Admin"],
        summary: "List testimonials (admin)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/admin/testimonials/{testimonialId}/status": {
      patch: {
        tags: ["Admin"],
        summary: "Update testimonial status (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "testimonialId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["status"],
                properties: {
                  status: {
                    type: "string",
                    enum: ["APPROVED", "REJECTED", "PENDING"]
                  },
                  isFeatured: { type: "boolean" }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/admin/testimonials/{testimonialId}": {
      delete: {
        tags: ["Admin"],
        summary: "Delete testimonial (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "testimonialId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/admin/team": {
      get: {
        tags: ["Admin"],
        summary: "List team members (admin)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      post: {
        tags: ["Admin"],
        summary: "Create team member (admin)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TeamMemberUpsertRequest" }
            }
          }
        },
        responses: {
          "201": { $ref: "#/components/responses/CreatedResponse" }
        }
      }
    },
    "/api/admin/team/{teamMemberId}": {
      get: {
        tags: ["Admin"],
        summary: "Get team member by id (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "teamMemberId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      patch: {
        tags: ["Admin"],
        summary: "Update team member (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "teamMemberId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TeamMemberUpsertRequest" }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      },
      delete: {
        tags: ["Admin"],
        summary: "Delete team member (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "teamMemberId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },

    "/api/admin/users": {
      get: {
        tags: ["Admin"],
        summary: "List users (admin)",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/admin/users/{userId}": {
      get: {
        tags: ["Admin"],
        summary: "Get user by id (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    },
    "/api/admin/users/{userId}/access": {
      patch: {
        tags: ["Admin"],
        summary: "Update user role/status (admin)",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  role: {
                    type: "string",
                    enum: ["STUDENT", "ADMIN", "SUPER_ADMIN"]
                  },
                  status: {
                    type: "string",
                    enum: [
                      "PENDING_VERIFICATION",
                      "ACTIVE",
                      "SUSPENDED",
                      "DEACTIVATED"
                    ]
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": { $ref: "#/components/responses/SuccessResponse" }
        }
      }
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: env.refreshCookieName
      }
    },
    responses: standardResponses,
    schemas: {
      ApiSuccessResponse: {
        type: "object",
        required: ["status", "message", "data"],
        properties: {
          status: { type: "string", enum: ["success"] },
          message: { type: "string" },
          data: { nullable: true }
        }
      },
      ApiErrorResponse: {
        type: "object",
        required: ["status", "message", "data"],
        properties: {
          status: { type: "string", enum: ["error"] },
          message: { type: "string" },
          data: {
            type: "object",
            properties: {
              code: { type: "string" },
              details: {}
            },
            nullable: true
          }
        }
      },
      RegisterRequest: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          password: {
            type: "string",
            minLength: 12,
            description: "Must include uppercase, lowercase, number, and symbol."
          }
        }
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" }
        }
      },
      RefreshRequest: {
        type: "object",
        properties: {
          refreshToken: {
            type: "string",
            description: "Optional when refresh cookie is present."
          }
        }
      },
      ResetPasswordRequest: {
        type: "object",
        required: ["token", "password"],
        properties: {
          token: { type: "string" },
          password: {
            type: "string",
            minLength: 12,
            description: "Must include uppercase, lowercase, number, and symbol."
          }
        }
      },
      ChangePasswordRequest: {
        type: "object",
        required: ["currentPassword", "newPassword"],
        properties: {
          currentPassword: { type: "string" },
          newPassword: {
            type: "string",
            minLength: 12,
            description: "Must include uppercase, lowercase, number, and symbol."
          }
        }
      },
      ProductUpsertRequest: {
        type: "object",
        required: ["name", "slug", "description", "link"],
        properties: {
          name: { type: "string" },
          slug: { type: "string" },
          description: { type: "string" },
          link: { type: "string" },
          imageUrl: { type: "string" },
          isPublished: { type: "boolean" }
        }
      },
      TeamMemberUpsertRequest: {
        type: "object",
        required: ["fullName", "roleTitle", "bio"],
        properties: {
          fullName: { type: "string" },
          roleTitle: { type: "string" },
          bio: { type: "string" },
          imageUrl: { type: "string" },
          linkedinUrl: { type: "string" },
          twitterUrl: { type: "string" },
          sortOrder: { type: "number" },
          isVisible: { type: "boolean" }
        }
      },
      ModuleUpsertRequest: {
        type: "object",
        required: ["title", "slug", "shortDescription", "description"],
        properties: {
          title: { type: "string" },
          slug: { type: "string" },
          shortDescription: { type: "string" },
          description: { type: "string" },
          order: { type: "number" },
          estimatedMinutes: { type: "number" },
          isPublished: { type: "boolean" },
          resources: {
            type: "array",
            items: {
              type: "object",
              required: ["title", "type"],
              properties: {
                title: { type: "string" },
                type: {
                  type: "string",
                  enum: ["VIDEO", "LINK", "DOCUMENT", "NOTE"]
                },
                url: { type: "string" },
                content: { type: "string" },
                sortOrder: { type: "number" }
              }
            }
          }
        }
      },
      QuizUpsertRequest: {
        type: "object",
        required: ["moduleId", "title", "questions"],
        properties: {
          moduleId: { type: "string" },
          title: { type: "string" },
          instructions: { type: "string" },
          passingScore: { type: "number" },
          timeLimitMinutes: { type: "number" },
          isPublished: { type: "boolean" },
          questions: {
            type: "array",
            items: {
              type: "object",
              required: ["prompt", "options"],
              properties: {
                prompt: { type: "string" },
                explanation: { type: "string" },
                sortOrder: { type: "number" },
                options: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["label", "isCorrect"],
                    properties: {
                      label: { type: "string" },
                      isCorrect: { type: "boolean" },
                      sortOrder: { type: "number" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
} as const;