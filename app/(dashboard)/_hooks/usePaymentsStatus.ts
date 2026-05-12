import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export interface PaymentStatus {
    paid: number;
    remaining: number;
    status: "paid" | "partial" | "unpaid";
    total: number;
}

export const usePaymentStatus = (
    invoiceId: string,
    enabled: boolean
) => {
    return useQuery<PaymentStatus>({
        queryKey: [
            "invoice-payment-status",
            invoiceId,
        ],

        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:5000/invoices/${invoiceId}/payment-status`
            );

            return data;
        },

        enabled,
    });
};