export function renderEmailLayout(title: string, preview: string, content: string): string {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#14213d;">
      <span style="display:none;visibility:hidden;opacity:0;height:0;width:0;">${preview}</span>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:#0b1f3a;padding:24px 32px;color:#ffffff;">
                  <p style="margin:0;font-size:13px;letter-spacing:0.14em;text-transform:uppercase;opacity:0.8;">A.E Learning Platform</p>
                  <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;">${title}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:32px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:0 32px 32px;color:#52606d;font-size:13px;line-height:1.6;">
                  If you did not request this email, you can safely ignore it.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
