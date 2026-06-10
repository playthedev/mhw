import { emailWrapper, baseStyles } from "./base"

interface ContactData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export function contactConfirmationTemplate(data: ContactData): string {
  const { name } = data
  const content = `
    <h1 style="${baseStyles.heading}">We received your message!</h1>
    <p style="${baseStyles.subheading}">Hi ${name}, thank you for reaching out. Our team will review your message and get back to you within <strong style="color:#ffffff;">24 hours</strong>.</p>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">Your message summary</p>
      <p style="color:#8888a0;font-size:13px;line-height:1.6;margin:8px 0 0;">${data.message}</p>
    </div>

    <p style="${baseStyles.small}">In the meantime, feel free to call us at <a href="tel:+918802660308" style="color:#818cf8;">+91 88026 60308</a> for urgent queries.</p>

    <hr style="${baseStyles.divider}" />
    <p style="${baseStyles.small}">Office hours: Mon–Fri 9 AM–6 PM · Sat 10 AM–2 PM IST</p>
  `
  return emailWrapper(content)
}

export function contactOwnerNotificationTemplate(data: ContactData): string {
  const { name, email, phone, subject, message } = data
  const content = `
    <h1 style="${baseStyles.heading}">New Contact Form Submission 📩</h1>
    <p style="${baseStyles.subheading}">Someone has submitted the contact form on the website.</p>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">From</p>
      <p style="${baseStyles.value};margin-bottom:16px;">${name} · <a href="mailto:${email}" style="color:#818cf8;">${email}</a></p>

      ${phone ? `<p style="${baseStyles.label}">Phone</p>
      <p style="${baseStyles.value};margin-bottom:16px;"><a href="tel:${phone}" style="color:#818cf8;">${phone}</a></p>` : ""}

      <p style="${baseStyles.label}">Subject</p>
      <p style="${baseStyles.value};margin-bottom:16px;">${subject}</p>

      <p style="${baseStyles.label}">Message</p>
      <p style="color:#e8e8f0;font-size:14px;line-height:1.7;margin:8px 0 0;white-space:pre-wrap;">${message}</p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="mailto:${email}" style="${baseStyles.btn}">Reply to ${name}</a>
    </div>

    <div style="text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contacts" style="color:#818cf8;font-size:13px;">View in Admin Panel →</a>
    </div>
  `
  return emailWrapper(content)
}
