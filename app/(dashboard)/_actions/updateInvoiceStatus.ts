"use server";

import { revalidateTag } from "next/cache";

import { url } from "@/app/(auth)/_services/auth.service";

import { getToken } from "../_helpers/getToken";

export async function updateInvoiceStatusAction(
    invoiceId: string,
) {
    try {
        const token = await getToken();
        const response = await fetch(
            `${url}/invoices/${invoiceId}/confirm`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.value}`,
                },

            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Error To Update Status"
            );
        }

        revalidateTag("invoices", "max");

        return result;
    } catch (error: any) {
        throw new Error(error.message);
    }
}