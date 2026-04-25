import { Payment } from "@/app/(dashboard)/_types/accounting";

export const payments: Payment[] = [
    {
        id: "PAY-1001",
        type: "receipt",
        contactName: "أحمد محمد",
        contactType: "customer",
        amount: 5000,
        method: "cash",
        date: "2026-04-01",
    },
    {
        id: "PAY-1002",
        type: "payment",
        contactName: "شركة النور",
        contactType: "vendor",
        amount: 12000,
        method: "bank",
        date: "2026-04-02",
    },
    {
        id: "PAY-1003",
        type: "receipt",
        contactName: "محمد علي",
        contactType: "customer",
        amount: 7500,
        method: "card",
        date: "2026-04-03",
    },
    {
        id: "PAY-1004",
        type: "payment",
        contactName: "Delta Supplies",
        contactType: "vendor",
        amount: 20000,
        method: "bank",
        date: "2026-04-05",
    },
    {
        id: "PAY-1005",
        type: "receipt",
        contactName: "Sara Ahmed",
        contactType: "customer",
        amount: 3200,
        method: "cash",
        date: "2026-04-06",
    },
];