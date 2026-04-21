import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    console.log(token, "middleware");
    const isAuthPage = req.nextUrl.pathname.startsWith("/signin");

    if (!token) {
        return NextResponse.redirect(new URL("/signin", req.url));
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/"],
};