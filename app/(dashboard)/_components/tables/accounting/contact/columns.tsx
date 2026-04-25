"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/app/(dashboard)/_types/accounting";


export const columns: ColumnDef<Contact>[] = [
    {
        accessorKey: "id",
        header: "الكود",
        cell: ({ row }) => (
            <span className="text-purple-500 font-medium">
                {row.getValue("id")}
            </span>
        ),
    },

    {
        accessorKey: "name",
        header: "الاسم",
    },

    {
        accessorKey: "type",
        header: "النوع",
        cell: ({ row }) => {
            const type = row.getValue("type") as Contact["type"];

            return (
                <Badge
                    className={
                        type === "customer"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                    }
                >
                    {type === "customer" ? "عميل" : "مورد"}
                </Badge>
            );
        },
    },

    {
        accessorKey: "phone",
        header: "الهاتف",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("phone") || "-"}
            </span>
        ),
    },

    {
        accessorKey: "email",
        header: "الإيميل",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("email") || "-"}
            </span>
        ),
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
                    {value.toLocaleString("ar-EG")} جنيه
                </span>
            );
        },
    },

    {
        accessorKey: "createdAt",
        header: "تاريخ الإنشاء",
    },
];