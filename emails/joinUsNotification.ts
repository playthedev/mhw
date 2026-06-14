import { emailWrapper, baseStyles } from "./base"
import type { JoinUsSubmission } from "@/lib/models"

const categoryLabels: Record<string, string> = {
  professional: "Professional",
  internship: "Internship",
  career: "Career",
}

function detailRows(data: JoinUsSubmission): string {
  const rows: Array<[string, string | undefined]> = [
    ["Category", categoryLabels[data.category] || data.category],
    ["Name", data.name],
    ["Mobile Number", data.mobile],
    ["Email", data.email],
    ["Profession / Sector", data.professionSector],
    ["Years of Experience", data.yearsOfExperience],
    ["Position Applying For", data.position],
    ["Qualification", data.qualification],
  ]

  return rows
    .filter(([, value]) => !!value)
    .map(
      ([label, value]) => `
      <p style="${baseStyles.label}">${label}</p>
      <p style="${baseStyles.value};margin-bottom:16px;">${value}</p>`
    )
    .join("")
}

export function joinUsConfirmationTemplate(data: JoinUsSubmission): string {
  const content = `
    <h1 style="${baseStyles.heading}">We received your application!</h1>
    <p style="${baseStyles.subheading}">Hi ${data.name}, thank you for applying to MHW Consultancy (${categoryLabels[data.category] || data.category}). Our team will review your application and get back to you soon.</p>

    <div style="${baseStyles.card}">
      <p style="${baseStyles.label}">Why you'd like to join</p>
      <p style="color:#e8e8f0;font-size:14px;line-height:1.7;margin:8px 0 0;white-space:pre-wrap;">${data.why}</p>
    </div>

    <hr style="${baseStyles.divider}" />
    <p style="${baseStyles.small}">If you have any questions, feel free to call us at <a href="tel:+917065127127" style="color:#818cf8;">+91 70651 27127</a>.</p>
  `
  return emailWrapper(content)
}

export function joinUsOwnerNotificationTemplate(data: JoinUsSubmission): string {
  const content = `
    <h1 style="${baseStyles.heading}">New "${categoryLabels[data.category] || data.category}" Application 📋</h1>
    <p style="${baseStyles.subheading}">Someone has submitted the Join Us form on the website.</p>

    <div style="${baseStyles.card}">
      ${detailRows(data)}

      <p style="${baseStyles.label}">Why they'd like to join</p>
      <p style="color:#e8e8f0;font-size:14px;line-height:1.7;margin:8px 0 0;white-space:pre-wrap;">${data.why}</p>

      ${data.resumeUrl ? `<p style="${baseStyles.label};margin-top:16px;">Resume</p>
      <p style="${baseStyles.value};margin:0;"><a href="${data.resumeUrl}" style="color:#818cf8;">View Resume</a></p>` : ""}
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="mailto:${data.email}" style="${baseStyles.btn}">Reply to ${data.name}</a>
    </div>
  `
  return emailWrapper(content)
}
