"use server";

import { cookies } from "next/headers";

export async function logout() {
    const cookieStore = await cookies();
    await fetch(`${process.env.BACKEND_BASE}/users/logout`, {
        method: "POST",
        credentials: "include"
    })
    cookieStore.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });

}