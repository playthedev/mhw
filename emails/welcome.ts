import { emailWrapper, baseStyles } from "./base"

export function welcomeTemplate(name: string): string {
  const content = `
    <h1 style="${baseStyles.heading}">Welcome to MHW Consultancy! 🎉</h1>
    <p style="${baseStyles.subheading}">Hi ${name}, your email has been verified and your account is now active. You're all set to explore our courses and services.</p>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">What you can do now</p>
      <ul style="color:#e8e8f0;font-size:14px;line-height:2;padding-left:20px;margin:8px 0 0;">
        <li>Browse and enroll in professional courses</li>
        <li>Track your learning progress from your dashboard</li>
        <li>Access study resources</li>
        <li>Contact our expert team for consulting</li>
      </ul>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/courses" style="${baseStyles.btn}">Explore Courses</a>
    </div>

    <hr style="${baseStyles.divider}" />
    <p style="${baseStyles.small}">Need help? Reply to this email or reach us at <a href="mailto:info@mhwconsultancy.com" style="color:#818cf8;">info@mhwconsultancy.com</a></p>
  `
  return emailWrapper(content)
}
