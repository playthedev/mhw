import { emailWrapper, baseStyles } from "./base"

interface EnrollmentEmailData {
  name: string
  courseName: string
  amount: number
  paymentId: string
}

export function enrollmentConfirmationTemplate(data: EnrollmentEmailData): string {
  const { name, courseName, amount, paymentId } = data
  const formattedAmount = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)

  const content = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="width:64px;height:64px;border-radius:50%;background:rgba(34,197,94,0.1);border:2px solid rgba(34,197,94,0.3);display:inline-flex;align-items:center;justify-content:center;font-size:28px;">✓</div>
    </div>

    <h1 style="${baseStyles.heading}">Enrolment Confirmed!</h1>
    <p style="${baseStyles.subheading}">Hi ${name}, your payment was successful and you are now enrolled. Welcome to the course!</p>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">Course</p>
      <p style="${baseStyles.value};margin-bottom:16px;">${courseName}</p>

      <p style="${baseStyles.label}">Amount Paid</p>
      <p style="${baseStyles.value};margin-bottom:16px;color:#4ade80;">${formattedAmount}</p>

      <p style="${baseStyles.label}">Payment Reference</p>
      <p style="color:#8888a0;font-size:12px;font-family:monospace;margin:4px 0 0;word-break:break-all;">${paymentId}</p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" style="${baseStyles.btn}">Go to My Dashboard</a>
    </div>

    <hr style="${baseStyles.divider}" />
    <p style="${baseStyles.small}">Have questions? Contact us at <a href="mailto:info@mhwconsultancy.com" style="color:#818cf8;">info@mhwconsultancy.com</a> or call <a href="tel:+917065127127" style="color:#818cf8;">+91 70651 27127</a>.</p>
  `
  return emailWrapper(content)
}

export function enrollmentOwnerNotificationTemplate(data: EnrollmentEmailData & { customerEmail: string }): string {
  const { name, customerEmail, courseName, amount, paymentId } = data
  const formattedAmount = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)

  const content = `
    <h1 style="${baseStyles.heading}">New Enrolment 💰</h1>
    <p style="${baseStyles.subheading}">A new student has enrolled and payment has been confirmed.</p>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">Student</p>
      <p style="${baseStyles.value};margin-bottom:16px;">${name} · <a href="mailto:${customerEmail}" style="color:#818cf8;">${customerEmail}</a></p>

      <p style="${baseStyles.label}">Course</p>
      <p style="${baseStyles.value};margin-bottom:16px;">${courseName}</p>

      <p style="${baseStyles.label}">Amount</p>
      <p style="${baseStyles.value};color:#4ade80;margin-bottom:16px;">${formattedAmount}</p>

      <p style="${baseStyles.label}">Razorpay Payment ID</p>
      <p style="color:#8888a0;font-size:12px;font-family:monospace;margin:4px 0 0;word-break:break-all;">${paymentId}</p>
    </div>
  `
  return emailWrapper(content)
}
