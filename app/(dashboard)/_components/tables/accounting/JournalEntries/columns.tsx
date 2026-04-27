"use client"

import { JournalEntry } from "@/app/(dashboard)/_types/accounting"
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<JournalEntry>[] = [
    {
        accessorKey: "reference",
        header: "المرجع",
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("reference")}</span>
        ),
    },
    {
        accessorKey: "description",
        header: "الوصف",
    },
    {
        accessorKey: "sourceType",
        header: "المصدر",
        cell: ({ row }) => {
            const value = row.getValue("sourceType") as string
            return (
                <span className="capitalize">{value}</span>
            )
        },
    },

    {
        accessorKey: "date",
        header: "تاريخ القيد",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date"))
            return (
                <span>
                    {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </span>
            )
        },
    },
    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            const map = {
                posted: "bg-green-500/20 text-green-600",
                draft: "bg-yellow-500/20 text-yellow-600",
                reversed: "bg-red-500/20 text-red-600",
            }
            const mapTitle = {
                posted: "منشور",
                draft: "مجدول",
                reversed: "معكوس",
            }
            return (
                <span className={`px-2 py-1 rounded-md text-xs ${map[status as keyof typeof map]}`}>
                    {mapTitle[status as keyof typeof map]}
                </span>
            )
        },
    },
]