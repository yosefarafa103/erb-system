"use server";
import { getToken } from "@/app/(dashboard)/_helpers/getToken";
import { GetMeReponseType as User } from "@/app/(dashboard)/_types/users";
import { cacheTag, revalidateTag } from "next/cache";
import { url } from "./auth.service";

export const switchTenant = async (tenantId: string) => {
    const token = await getToken()
    try {
        const res = await fetch(
            `${process.env.BACKEND_BASE}/users/switch-tenant`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token?.value}`,
                },
                body: JSON.stringify({ tenantId }),
            }
        );

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Failed to switch tenant");
        }
        revalidateTag(`users_${tenantId}`, {})
        return res.json();
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
};

export const getUsersByTenant = async (tenantId: string): Promise<User[]> => {
    "use cache";
    cacheTag(`users_${tenantId}`)
    try {
        return await getTenentUsers(tenantId)
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
};
export async function getTenentUsers(tenentId: string) {
    const res = await fetch(
        `${url}/users/get-tenant-users?tenantId=${tenentId}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to get users");
    }
    return res.json();
}