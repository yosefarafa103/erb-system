"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Payment = {
    id: string;
    type: "payment" | "receipt";
    contactName: string;
    contactType: "customer" | "vendor";
    amount: number;
    method: "cash" | "bank" | "card";
    date: string;
};

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: "الرقم",
        cell: ({ row }) => (
            <span className="font-medium text-purple-500">
                {row.getValue("id")}
            </span>
        ),
    },

    {
        accessorKey: "type",
        header: "النوع",
        cell: ({ row }) => {
            const type = row.getValue("type") as Payment["type"];

            return (
                <Badge className={type === "receipt" ? "bg-green-500" : "bg-red-500"}>
                    {type === "receipt" ? "تحصيل" : "دفعة"}
                </Badge>
            );
        },
    },

    {
        accessorKey: "contactName",
        header: "الطرف",
        cell: ({ row }) => (
            <span>{row.getValue("contactName")}</span>
        ),
    },

    {
        accessorKey: "contactType",
        header: "النوع",
        cell: ({ row }) => {
            const type = row.getValue("contactType") as Payment["contactType"];

            return (
                <Badge variant="outline">
                    {type === "customer" ? "عميل" : "مورد"}
                </Badge>
            );
        },
    },

    {
        accessorKey: "amount",
        header: "المبلغ",
        cell: ({ row }) => {
            const value = row.getValue("amount") as number;

            return (
                <span className="font-bold text-foreground">
                    {value.toLocaleString("ar-EG")} جنيه
                </span>
            );
        },
    },

    {
        accessorKey: "method",
        header: "طريقة الدفع",
        cell: ({ row }) => {
            const method = row.getValue("method");

            const map: Record<string, string> = {
                cash: "كاش",
                bank: "تحويل بنكي",
                card: "كارت",
            };

            return (
                <span className="text-muted-foreground">
                    {map[method as string]}
                </span>
            );
        },
    },

    {
        accessorKey: "date",
        header: "التاريخ",
    },
];