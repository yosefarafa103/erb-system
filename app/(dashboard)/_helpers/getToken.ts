import { cookies } from "next/headers";
import { GetMeReponseType } from "../_types/users";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function getToken(): Promise<RequestCookie | undefined> {
    return (await cookies()).get("token")
}