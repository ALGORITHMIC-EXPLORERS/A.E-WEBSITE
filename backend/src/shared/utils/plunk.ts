import { env } from "../../config/env";
import { AppError } from "../errors/app-error";

interface SendEmailInput {
  to: string;
  subject: string;
  body: string;
}

function parsePlunkErrorDetails(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export async function sendEmailWithPlunk(input: SendEmailInput): Promise<void> {
  if (!env.plunkApiKey) {
    throw new AppError(
      500,
      "PLUNK_API_KEY is missing. Configure it before sending emails.",
      "PLUNK_NOT_CONFIGURED"
    );
  }

  const response = await fetch("https://next-api.useplunk.com/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.plunkApiKey}`
    },
    body: JSON.stringify({
      to: input.to,
      subject: input.subject,
      body: input.body,
      subscribed: true
    })
  });

  if (!response.ok) {
    const responseBody = await response.text();

    throw new AppError(
      502,
      "Plunk failed to send the email.",
      "PLUNK_SEND_FAILED",
      parsePlunkErrorDetails(responseBody)
    );
  }
}
