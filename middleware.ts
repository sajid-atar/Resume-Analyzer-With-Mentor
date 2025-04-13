import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/auth/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/create/:path*",
    "/analyze/:path*",
    "/resume/:path*",
    "/mentors/:path*",
    "/analysis/:path*",
    "/api/resumes/:path*",
    "/api/analyze/:path*",
    "/api/mentors/:path*",
    "/api/analysis/:path*"
  ]
} 