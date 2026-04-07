import { renderEmailLayout } from "./base-email";

export function renderVerificationEmail(input: {
  firstName: string;
  verificationUrl: string;
}): string {
  return renderEmailLayout(
    "Verify your email",
    "Confirm your account to start your learning cohort.",
    `
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Hi ${input.firstName},</p>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
        Welcome to A.E. Please verify your email address so we can activate your account securely.
      </p>
      <p style="margin:24px 0;">
        <a href="${input.verificationUrl}" style="display:inline-block;background:#0b1f3a;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:bold;">
          Verify Email
        </a>
      </p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#52606d;">
        If the button does not work, copy and paste this link into your browser:<br />
        <a href="${input.verificationUrl}">${input.verificationUrl}</a>
      </p>
    `
  );
}
