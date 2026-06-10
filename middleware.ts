import { NextRequest, NextResponse } from "next/server"
import { getSessionFromRequest } from "@/lib/auth"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const session = await getSessionFromRequest(req)

  // Protect /admin — must be logged in AND have admin role
  if (pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login?redirect=/admin", req.url))
    }
    if (session.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Protect /dashboard — must be logged in
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, req.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL(session.role === "admin" ? "/admin" : "/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
}
