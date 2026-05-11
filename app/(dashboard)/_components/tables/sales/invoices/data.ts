import { Invoice } from "@/app/(dashboard)/_types/Invoices";

export const data: Invoice[] = [
    {
        _id: "1",
        invoiceNumber: "INV-001",
        customerName: "Yosef A",
        total: 15000,
        status: "paid",
        date: "2026-04-26T13:27:53.473Z",
    },
    {
        _id: "2",
        invoiceNumber: "INV-002",
        customerName: "Ahmed Ali",
        total: 5400,
        status: "unpaid",
        date: "2026-04-27T10:10:00.000Z",
    },
    {
        _id: "3",
        invoiceNumber: "INV-003",
        customerName: "Sara Mohamed",
        total: 8200,
        status: "partial",
        date: "2026-04-28T09:00:00.000Z",
    },
]