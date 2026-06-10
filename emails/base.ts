export const baseStyles = {
  body: `margin:0;padding:0;background:#0a0a0f;font-family:'Inter',Arial,sans-serif;`,
  wrapper: `max-width:600px;margin:0 auto;background:#111118;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);`,
  header: `background:linear-gradient(135deg,#4f5eff 0%,#a855f7 100%);padding:40px 40px 32px;text-align:center;`,
  logo: `display:inline-flex;align-items:center;gap:10px;text-decoration:none;`,
  logoBox: `width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,0.2);display:inline-block;text-align:center;line-height:40px;font-size:18px;`,
  logoText: `color:#ffffff;font-size:20px;font-weight:700;`,
  body_inner: `padding:40px;`,
  heading: `color:#ffffff;font-size:24px;font-weight:700;margin:0 0 12px;`,
  subheading: `color:#8888a0;font-size:15px;line-height:1.6;margin:0 0 32px;`,
  btn: `display:inline-block;background:linear-gradient(135deg,#4f5eff,#a855f7);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:12px;font-weight:600;font-size:15px;`,
  divider: `border:none;border-top:1px solid rgba(255,255,255,0.06);margin:32px 0;`,
  small: `color:#8888a0;font-size:13px;line-height:1.6;`,
  footer: `background:#0d0d16;padding:24px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);`,
  footerText: `color:#8888a0;font-size:12px;margin:0;`,
  card: `background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:20px 24px;margin:0 0 24px;`,
  label: `color:#8888a0;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 4px;`,
  value: `color:#ffffff;font-size:15px;font-weight:500;margin:0;`,
}

export function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MHW Consultancy</title></head>
<body style="${baseStyles.body}">
  <div style="padding:32px 16px;">
    <div style="${baseStyles.wrapper}">
      <div style="${baseStyles.header}">
        <div style="${baseStyles.logo}">
          <div style="${baseStyles.logoBox}">💼</div>
          <span style="${baseStyles.logoText}">MHW Consultancy</span>
        </div>
      </div>
      <div style="${baseStyles.body_inner}">
        ${content}
      </div>
      <div style="${baseStyles.footer}">
        <p style="${baseStyles.footerText}">MHW Consultancy Pvt. Ltd. · Aman Vihar, Kadipur, Delhi</p>
        <p style="${baseStyles.footerText};margin-top:6px;">© ${new Date().getFullYear()} MHW Consultancy. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`
}
