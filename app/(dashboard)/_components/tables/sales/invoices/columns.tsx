"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Invoice } from "@/app/(dashboard)/_types/Invoices";

export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoiceNumber",
        header: "الفاتورة",
        cell: ({ row }) => (
            <span className="font-medium">
                {row.getValue("invoiceNumber")}
            </span>
        ),
    },
    {
        accessorKey: "customerName",
        header: "اسم العميل",
    },
    {
        accessorKey: "total",
        header: "الكمية",
        cell: ({ row }) => {
            const value = row.getValue("total") as number
            return <span>{value.toLocaleString()} EGP</span>
        },
    },
    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            const styles = {
                paid: "bg-green-500/20 text-green-600",
                unpaid: "bg-red-500/20 text-red-600",
                partial: "bg-yellow-500/20 text-yellow-600",
            }

            return (
                <span className={`px-2 py-1 rounded-md text-xs ${styles[status]}`}>
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "date",
        header: "التاريخ",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            return (
                <span>
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </span>
            )
        },
    },
]