import { NextResponse } from "next/server"
import { clearSessionCookie } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST() {
  const cookie = clearSessionCookie()
  const res = NextResponse.json({ success: true })
  res.cookies.set(cookie)
  return res
}
