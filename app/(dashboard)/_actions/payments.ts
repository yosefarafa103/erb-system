"use server";

import { revalidateTag } from "next/cache";
import { url } from "@/app/(auth)/_services/auth.service";
import { getToken } from "../_helpers/getToken";
export async function createPaymentAction(
    paymentBody: FormData
) {
    try {
        const token = await getToken();

        const payload = {
            tenantId:
                paymentBody.get("tenantId"),

            amount: Number(
                paymentBody.get("amount")
            ),

            method:
                paymentBody.get("method"),

            direction:
                paymentBody.get("direction") ?? "in",

            reference:
                paymentBody.get("reference") ?? "invoice",

            description:
                paymentBody.get("description") ?? " ",

            invoiceId:
                paymentBody.get("invoiceId"),

            status:
                "draft",

            createdBy:
                paymentBody.get("createdBy"),
        };
        console.log("payload: ", payload);

        const response = await fetch(
            `${url}/payments`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization: `Bearer ${token?.value}`,
                },

                body: JSON.stringify(
                    payload
                ),
            }
        );

        const result =
            await response.json();
        if (!response.ok) {
            throw new Error(
                result.message ||
                "فشل في إنشاء الدفعة"
            );
        }

        revalidateTag("payments", 'max');
        revalidateTag("invoices", 'max');


    } catch (error: any) {
        console.log(error);
    }
}