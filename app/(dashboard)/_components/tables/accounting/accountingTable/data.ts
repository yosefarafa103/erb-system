import { AccountingAlert } from "@/app/(dashboard)/_types/accounting";

export const accountingAlerts: AccountingAlert[] = [
    {
        dueDate: "2024-10-13",
        id: '1',
        relatedType: 'invoice',
        severity: 'danger',
        amount: 2000,
        title: 'aaa',
        type: "due_payment",
        details: "لم يتم استلام الفاتورة"
    }
]

