import { AccountingAlert } from "@/app/(dashboard)/_types/accounting";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AccountingAlert>[] = [
    {
        accessorKey: "title",
        header: "التنبية",
        cell({ getValue, column }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "details",
        header: "التفاصيل",
        cell({ getValue }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "amount",
        header: "المبلغ",
        cell({ getValue }) {
            return <>
                {Number(getValue()).toLocaleString("in-IN")} جنيه
            </>
        },
    },
    {
        accessorKey: "dueDate",
        header: "تاريخ الاستحقاق",
        cell({ getValue, }) {
            return <>
                {getValue()}
            </>
        },
    }
]