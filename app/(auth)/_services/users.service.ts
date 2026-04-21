"use server";
import { getToken } from "@/app/(dashboard)/_helpers/getToken";

export const switchTenant = async (tenantId: string) => {
    const token = await getToken()
    try {
        const res = await fetch(
            `${process.env.BACKEND_BASE || "http://localhost:5000"}/users/switch-tenant`,
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

        return res.json();
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
};

export const getUsersByTenant = async (tenantId: string) => {
    try {
        const res = await fetch(
            `${process.env.BACKEND_BASE || "http://localhost:5000"}/users?tenantId=${tenantId}`,
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
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong");
    }
};