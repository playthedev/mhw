import { emailWrapper, baseStyles } from "./base"

export function verifyEmailTemplate(name: string, verifyUrl: string): string {
  const content = `
    <h1 style="${baseStyles.heading}">Verify your email address</h1>
    <p style="${baseStyles.subheading}">Hi ${name}, welcome to MHW Consultancy! Please verify your email address to activate your account and start learning.</p>

    <div style="text-align:center;margin:32px 0;">
      <a href="${verifyUrl}" style="${baseStyles.btn}">Verify Email Address</a>
    </div>

    <hr style="${baseStyles.divider}" />

    <p style="${baseStyles.small}">This link expires in <strong style="color:#ffffff;">24 hours</strong>. If you didn't create an account, you can safely ignore this email.</p>
    <p style="${baseStyles.small};margin-top:12px;">Or copy this link into your browser:<br/>
      <span style="color:#818cf8;word-break:break-all;">${verifyUrl}</span>
    </p>
  `
  return emailWrapper(content)
}
