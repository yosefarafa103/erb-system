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
    account: string;
    debit: number;
    credit: number;
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
type Invoice = {
    id: string;
    customer: string;
    date: string;
    dueDate: string;
    total: number;
    status: string;
};
export type PaymentType = "payment" | "receipt";

export type PaymentMethod = "cash" | "bank" | "card";

export type Payment = {
    id: string;
    type: PaymentType;
    contactName: string
    contactType: "customer" | "vendor";
    amount: number;
    method: PaymentMethod;
    date: string;
    reference?: string;
    invoiceId?: string;
};

export type ContactType = "customer" | "vendor";

export type Contact = {
    id: string;
    name: string;
    type: ContactType;
    phone?: string;
    email?: string;
    address?: string;
    balance: number;
    createdAt: string;
};


export type LedgerEntry = {
    id: string;
    date: string;
    accountCode: string;
    accountName: string;
    description: string;
    reference?: string;

    debit: number;
    credit: number;

    balance: number
};

export type { AccountingAlert, AlertSeverity, AlertType, JournalEntry, JournalEntryLine, Invoice }