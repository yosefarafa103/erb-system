"use server";

import { revalidateTag } from "next/cache";

import { url } from "@/app/(auth)/_services/auth.service";

import { getToken } from "../_helpers/getToken";

export async function createInvoiceAction(
  invoiceBody: FormData
) {
  try {
    const token = await getToken();

    const payload = {
      customerId: invoiceBody.get("customerId"),
      subTotal: Number(invoiceBody.get("subTotal")),
      tax: Number(invoiceBody.get("tax")),
      discount: Number(invoiceBody.get("discount")),
      total: Number(invoiceBody.get("total")),
      status: invoiceBody.get("status"),

      tenantId: invoiceBody.get("tenantId"),
      createdBy: invoiceBody.get("createdBy"),

      items: JSON.parse(
        invoiceBody.get("items") as string
      ),
    };

    console.log(payload, "payload");

    const response = await fetch(`${url}/invoices`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },

      body: JSON.stringify(payload),
    });

    const result = await response.json();

    console.log(result, "server response");

    if (!response.ok) {
      throw new Error(
        result.message || "فشل في إنشاء الفاتورة"
      );
    }

    revalidateTag("invoices", "max");

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      error: error.message,
    };
  }
}