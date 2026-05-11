import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getToken(): Promise<RequestCookie | undefined> {
    return (await cookies()).get("token")
}