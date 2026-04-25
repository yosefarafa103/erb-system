"use server";

import { getToken } from "@/app/(dashboard)/_helpers/getToken";
export async function addUserToTenantAction(
    userId: string,
    tenantId: string,
    role: string
) {
    try {
        const token = await getToken();
        const res = await fetch(
            `${process.env.BACKEND_BASE}/users/add-to-tenant`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token?.value}`,
                },
                body: JSON.stringify({
                    userId,
                    tenantId,
                    role,
                }),
            }
        );
        const data = await res.json();
        if (!res.ok) {
            throw new Error("Failed to add user")
        }

    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
}