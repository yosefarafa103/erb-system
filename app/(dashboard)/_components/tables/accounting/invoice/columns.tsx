"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/app/(dashboard)/_types/accounting";


export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "id",
        header: "رقم الفاتورة",
        cell: ({ row }) => (
            <span className="font-medium text-purple-500">
                {row.getValue("id")}
            </span>
        ),
    },

    {
        accessorKey: "customer",
        header: "العميل",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("customer")}
            </span>
        ),
    },

    {
        accessorKey: "date",
        header: "التاريخ",
        cell: ({ row }) => (
            <span>{row.getValue("date")}</span>
        ),
    },

    {
        accessorKey: "dueDate",
        header: "تاريخ الاستحقاق",
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue("dueDate")}
            </span>
        ),
    },

    {
        accessorKey: "total",
        header: "الإجمالي",
        cell: ({ row }) => {
            const value = row.getValue("total") as number;

            return (
                <span className="font-bold text-foreground">
                    {value.toLocaleString("ar-EG")} جنيه
                </span>
            );
        },
    },

    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
            const status = row.getValue("status") as Invoice["status"];

            const statusMap: Record<
                Invoice["status"],
                { label: string; className: string }
            > = {
                draft: { label: "مسودة", className: "bg-gray-500" },
                posted: { label: "مرحلة", className: "bg-blue-500" },
                paid: { label: "مدفوعة", className: "bg-green-500" },
                overdue: { label: "متأخرة", className: "bg-red-500" },
            };

            return (
                <Badge className={statusMap[status].className}>
                    {statusMap[status].label}
                </Badge>
            );
        },
    },
];