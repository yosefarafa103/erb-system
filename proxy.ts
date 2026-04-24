import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;
    const isAuthPage = pathname.startsWith("/signin");
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/",
        // "/signin"
    ],
};