import { create } from "zustand";
import { Invoice } from "../_types/accounting";

const invoices = [
    {
        id: "INV-1001",
        customer: "أحمد محمد",
        date: "2026-04-01",
        dueDate: "2026-04-10",
        total: 5000,
        status: "paid",
    },
    {
        id: "INV-1002",
        customer: "شركة النور للتجارة",
        date: "2026-04-03",
        dueDate: "2026-04-12",
        total: 12000,
        status: "posted",
    },
    {
        id: "INV-1003",
        customer: "محمد علي",
        date: "2026-04-05",
        dueDate: "2026-04-15",
        total: 7500,
        status: "draft",
    },
    {
        id: "INV-1004",
        customer: "Tech Solutions",
        date: "2026-04-07",
        dueDate: "2026-04-17",
        total: 20000,
        status: "overdue",
    },
    {
        id: "INV-1005",
        customer: "سارة أحمد",
        date: "2026-04-10",
        dueDate: "2026-04-20",
        total: 3200,
        status: "paid",
    },
    {
        id: "INV-1006",
        customer: "Global Trading Co",
        date: "2026-04-12",
        dueDate: "2026-04-22",
        total: 15000,
        status: "posted",
    },
    {
        id: "INV-1007",
        customer: "Ali Hassan",
        date: "2026-04-14",
        dueDate: "2026-04-25",
        total: 9800,
        status: "draft",
    },
    {
        id: "INV-1008",
        customer: "El Noor Pharmacy",
        date: "2026-04-16",
        dueDate: "2026-04-26",
        total: 6400,
        status: "paid",
    },
    {
        id: "INV-1009",
        customer: "Delta Construction",
        date: "2026-04-18",
        dueDate: "2026-04-28",
        total: 45000,
        status: "overdue",
    },
    {
        id: "INV-1010",
        customer: "Omar Enterprises",
        date: "2026-04-20",
        dueDate: "2026-04-30",
        total: 11000,
        status: "posted",
    },
];

type Store = {
    invoices: Invoice[];
    addInvoice: (inv: Invoice) => void;
};

export const useInvoiceStore = create<Store>((set) => ({
    invoices: invoices,

    addInvoice: (inv) =>
        set((state) => ({
            invoices: [inv, ...state.invoices],
        })),
}));