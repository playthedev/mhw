import { Resend } from "resend"
import { verifyEmailTemplate } from "@/emails/verifyEmail"
import { welcomeTemplate } from "@/emails/welcome"
import { forgotPasswordTemplate } from "@/emails/forgotPassword"
import { enrollmentConfirmationTemplate, enrollmentOwnerNotificationTemplate } from "@/emails/enrollmentConfirmation"
import { contactConfirmationTemplate, contactOwnerNotificationTemplate } from "@/emails/contactNotification"
import { joinUsConfirmationTemplate, joinUsOwnerNotificationTemplate } from "@/emails/joinUsNotification"
import type { JoinUsSubmission } from "@/lib/models"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = process.env.EMAIL_FROM || "MHW Consultancy <info@mhwconsultancy.com>"
const OWNER_EMAIL = process.env.OWNER_EMAIL || "info@mhwconsultancy.com"

export async function sendVerificationEmail(to: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify-email?token=${token}`
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Verify your email — MHW Consultancy",
    html: verifyEmailTemplate(name, url),
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to MHW Consultancy!",
    html: welcomeTemplate(name),
  })
}

export async function sendForgotPasswordEmail(to: string, name: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${token}`
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Reset your password — MHW Consultancy",
    html: forgotPasswordTemplate(name, url),
  })
}

export async function sendEnrollmentConfirmation(data: {
  to: string
  name: string
  courseName: string
  amount: number
  paymentId: string
}) {
  const { to, ...rest } = data
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Enrolment Confirmed: ${data.courseName} — MHW Consultancy`,
    html: enrollmentConfirmationTemplate(rest),
  })
  // Also notify owner
  await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `New Enrolment: ${data.courseName}`,
    html: enrollmentOwnerNotificationTemplate({ ...rest, customerEmail: to }),
  })
}

export async function sendContactEmails(data: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  // Confirmation to the user
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "We received your message — MHW Consultancy",
    html: contactConfirmationTemplate(data),
  })
  // Notification to owner
  await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `New Contact: ${data.subject} from ${data.name}`,
    html: contactOwnerNotificationTemplate(data),
  })
}

const joinUsCategoryLabels: Record<string, string> = {
  professional: "Professional",
  internship: "Internship",
  career: "Career",
}

export async function sendJoinUsEmails(data: JoinUsSubmission) {
  // Confirmation to the applicant
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: "We received your application — MHW Consultancy",
    html: joinUsConfirmationTemplate(data),
  })
  // Notification to owner
  await resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `New ${joinUsCategoryLabels[data.category] || data.category} Application: ${data.name}`,
    html: joinUsOwnerNotificationTemplate(data),
  })
}
