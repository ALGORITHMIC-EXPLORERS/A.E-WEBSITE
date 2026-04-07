import { renderEmailLayout } from "./base-email";

export function renderResetPasswordEmail(input: {
  firstName: string;
  resetUrl: string;
}): string {
  return renderEmailLayout(
    "Reset your password",
    "Use this secure link to reset your account password.",
    `
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Hi ${input.firstName},</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
        We received a request to reset your password. Use the secure button below to create a new one.
      </p>
      <p style="margin:24px 0;">
        <a href="${input.resetUrl}" style="display:inline-block;background:#a53f2b;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:bold;">
          Reset Password
        </a>
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#52606d;">
        If you did not request this, you can ignore this email and your password will remain unchanged.
      </p>
    `
  );
}
