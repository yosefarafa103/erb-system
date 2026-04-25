"use client";

import { LedgerEntry } from "@/app/(dashboard)/_types/accounting";
import { ColumnDef } from "@tanstack/react-table";


export const columns: ColumnDef<LedgerEntry>[] = [
    {
        accessorKey: "date",
        header: "التاريخ",
    },

    {
        accessorKey: "accountCode",
        header: "كود الحساب",
        cell: ({ row }) => (
            <span className="text-purple-500 font-medium">
                {row.getValue("accountCode")}
            </span>
        ),
    },

    {
        accessorKey: "accountName",
        header: "اسم الحساب",
    },

    {
        accessorKey: "description",
        header: "الوصف",
    },

    {
        accessorKey: "reference",
        header: "مرجع",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("reference") || "-"}
            </span>
        ),
    },

    {
        accessorKey: "debit",
        header: "مدين",
        cell: ({ row }) => {
            const value = row.getValue("debit") as number;

            return value ? (
                <span className="text-green-600 font-bold">
                    {value.toLocaleString("ar-EG")}
                </span>
            ) : (
                "-"
            );
        },
    },

    {
        accessorKey: "credit",
        header: "دائن",
        cell: ({ row }) => {
            const value = row.getValue("credit") as number;

            return value ? (
                <span className="text-red-500 font-bold">
                    {value.toLocaleString("ar-EG")}
                </span>
            ) : (
                "-"
            );
        },
    },

    {
        accessorKey: "balance",
        header: "الرصيد",
        cell: ({ row }) => {
            const value = row.getValue("balance") as number;

            return (
                <span
                    className={
                        value >= 0
                            ? "text-green-600 font-bold"
                            : "text-red-500 font-bold"
                    }
                >
                    {value.toLocaleString("ar-EG")}
                </span>
            );
        },
    },
];