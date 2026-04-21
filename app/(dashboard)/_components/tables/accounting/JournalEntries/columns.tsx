import { JournalEntry } from "@/app/(dashboard)/_types/accounting";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<JournalEntry>[] = [
    {
        accessorKey: "id",
        header: "رقم القيد",
        cell({ getValue, column }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "date",
        header: "التاريخ",
        cell({ getValue }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "description",
        header: "البيان",
        cell({ getValue }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "totalDebit",
        header: "مجموع المدين",
        cell({ getValue, }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "totalCredit",
        header: "مجموع الدائن",
        cell({ getValue, }) {
            return <>
                {getValue()}
            </>
        },
    },
    {
        accessorKey: "status",
        header: "الحالة",
        cell({ getValue, }) {
            return <>
                {getValue()}
            </>
        },
    },

     {
        accessorKey: "lines",
        header: "",
        cell(props) {
            return null
        },
      
    },

]