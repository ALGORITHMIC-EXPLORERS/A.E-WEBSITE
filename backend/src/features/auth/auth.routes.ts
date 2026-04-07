import { Router } from "express";

import { authenticate } from "../../middlewares/auth";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post("/verify-email", authController.verifyEmail);
authRouter.post("/resend-verification", authController.resendVerificationEmail);
authRouter.get("/me", authenticate, authController.me);
authRouter.post("/change-password", authenticate, authController.changePassword);

export { authRouter };
