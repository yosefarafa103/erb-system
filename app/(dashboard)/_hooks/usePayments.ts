import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface PaymentRecord {
    _id: string;
    tenantId: string;
    amount: number;
    method: "cash" | "card" | "bank" | "wallet";
    direction: "in" | "out";
    reference: string;
    description: string;
    createdBy: string;
    status: "posted" | "draft"
    __v: number;
}
export const usePayments = (
    tenantId: string | null,
    enabled: boolean = true
) => {
    return useQuery<PaymentRecord[]>({
        queryKey: ["payments", tenantId],

        queryFn: async () => {
            if (!tenantId) return [];

            const { data } = await axios.get(
                `https://erb-api-fkhg.vercel.app/payments`,
                {
                    params: {
                        tenentId: tenantId
                    }
                }
            );

            return data;
        },

        enabled: !!tenantId && enabled,
    });
};