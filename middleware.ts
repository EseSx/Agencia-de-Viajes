import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const token = request.cookies.get("auth-token")?.value
    const {pathname} = request.nextUrl

    const protectedRoutes = ["/dashboard", "/admin"]

    const authRoutes = ["/login"]

    const isProtected = protectedRoutes.some(r => pathname.startsWith(r))
    const isAuthRoute = authRoutes.some(r => pathname.startsWith(r))

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
}