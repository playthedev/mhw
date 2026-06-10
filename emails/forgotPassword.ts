import { emailWrapper, baseStyles } from "./base"

export function forgotPasswordTemplate(name: string, resetUrl: string): string {
  const content = `
    <h1 style="${baseStyles.heading}">Reset your password</h1>
    <p style="${baseStyles.subheading}">Hi ${name}, we received a request to reset your MHW Consultancy account password. Click the button below to choose a new one.</p>

    <div style="text-align:center;margin:32px 0;">
      <a href="${resetUrl}" style="${baseStyles.btn}">Reset Password</a>
    </div>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">Security notice</p>
      <p style="color:#8888a0;font-size:13px;margin:8px 0 0;line-height:1.6;">This link expires in <strong style="color:#ffffff;">1 hour</strong>. If you didn't request a password reset, please ignore this email — your password will remain unchanged.</p>
    </div>

    <hr style="${baseStyles.divider}" />
    <p style="${baseStyles.small}">Or copy this link into your browser:<br/>
      <span style="color:#818cf8;word-break:break-all;">${resetUrl}</span>
    </p>
  `
  return emailWrapper(content)
}
