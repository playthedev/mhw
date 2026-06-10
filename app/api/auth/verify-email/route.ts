import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { sendWelcomeEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token")
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  if (!token) {
    return NextResponse.redirect(`${baseUrl}/verify-email?error=missing_token`)
  }

  try {
    const db = await getDb()
    const user = await db.collection("users").findOne({
      emailVerifyToken: token,
      emailVerifyExpires: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.redirect(`${baseUrl}/verify-email?error=invalid_or_expired`)
    }

    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: { emailVerified: true, updatedAt: new Date() },
        $unset: { emailVerifyToken: "", emailVerifyExpires: "" },
      }
    )

    await sendWelcomeEmail(user.email, user.name)

    return NextResponse.redirect(`${baseUrl}/verify-email?success=true`)
  } catch (err) {
    console.error("Email verification error:", err)
    return NextResponse.redirect(`${baseUrl}/verify-email?error=server_error`)
  }
}
