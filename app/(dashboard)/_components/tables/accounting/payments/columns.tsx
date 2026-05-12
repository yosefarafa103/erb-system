"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { PaymentRecord } from "@/app/(dashboard)/_hooks/usePayments";
export const columns: ColumnDef<PaymentRecord>[] = [
    {
        accessorKey: "_id",
        header: "الرقم",
        cell: ({ row }) => {
            const id = row.original._id;
            return (
                <span className="font-medium text-purple-500">
                    #{id ? id.slice(-5) : "---"}
                </span>
            );
        },
    },

    {
        accessorKey: "direction",
        header: "النوع",
        cell: ({ row }) => {
            const direction = row.original.direction;
            const isReceipt = direction === "in";

            return (
                <Badge className={isReceipt ? "bg-green-500" : "bg-red-500"}>
                    {isReceipt ? "تحصيل" : "دفعة"}
                </Badge>
            );
        },
    },

    {
        accessorKey: "invoiceId.customerId.name",
        header: "الطرف",
        cell: ({ row }) => {
            const contactName = row.original?.createdBy?.name || "بدون اسم";
            console.log(row.original);
            return (
                <div className="flex flex-col">
                    <span className="font-medium">{contactName}</span>
                    <span className="text-[10px] text-muted-foreground">
                        فاتورة: {row.original.invoiceId?.invoiceNumber || "---"}
                    </span>
                </div>
            );
        },
    },

    {
        accessorKey: "amount",
        header: "المبلغ",
        cell: ({ row }) => {
            const value = row.original.amount;
            return (
                <span className="font-bold text-foreground">
                    {value?.toLocaleString("ar-EG")} ج.م
                </span>
            );
        },
    },

    {
        accessorKey: "method",
        header: "طريقة الدفع",
        cell: ({ row }) => {
            const method = row.original.method;
            const map: Record<string, string> = {
                cash: "كاش",
                bank: "تحويل بنكي",
                card: "كارت",
                wallet: "محفظة",
            };

            return (
                <span className="text-muted-foreground text-sm">
                    {map[method] || method}
                </span>
            );
        },
    },

    {
        accessorKey: "status",
        header: "الحالة",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge variant="outline" className={status === "posted" ? "border-blue-500 text-blue-600" : ""}>
                    {status === "posted" ? "مؤكد" : "معلق"}
                </Badge>
            );
        },
    },

    {
        accessorKey: "createdAt",
        header: "التاريخ",
        cell: ({ row }) => {
            const date = row.original.createdAt;
            return (
                <span className="text-xs text-muted-foreground">
                    {date ? new Date(date).toLocaleDateString("ar-EG") : "---"}
                </span>
            );
        }
    },
];