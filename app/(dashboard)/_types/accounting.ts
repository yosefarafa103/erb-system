type AlertType = "overdue_invoice" | "due_payment" | "check_maturity" | "low_cash" | "tax_deadline" | "unreconiled_bank";
type AlertSeverity = "info" | "warning" | "danger";
interface AccountingAlert {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    title: string;
    details?: string;
    amount?: number;
    dueDate: string;
    relatedType: "invoice" | "bill" | "check" | "customer"
}
type JournalStatus = "posted" | "draft" | "canceled"
interface JournalEntryLine {
    id: string;
    accountCode: string;
    accountName: string;
    description: string;
    debit: number
    credit: number
}
interface JournalEntry {
    id: string;
    date: string;
    reference: string;
    description: string;
    totalDebit: number
    totalCredit: number
    status: JournalStatus;
    lines: JournalEntryLine[],
    createdAt: string
}


export type { AccountingAlert, AlertSeverity, AlertType, JournalEntry, JournalEntryLine }