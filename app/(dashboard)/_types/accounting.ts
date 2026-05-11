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
type JournalEntry = {
    _id: string
    tenantId: string
    reference: string
    description?: string
    sourceType: "sale" | "purchase" | "payment"
    sourceId?: string
    status: "draft" | "posted" | "reversed"
    date: string
    createdAt: string
    updatedAt: string
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
export type AccountCode =
    | "CASH"
    | "BANK"
    | "ACCOUNTS_RECEIVABLE"
    | "ACCOUNTS_PAYABLE"
    | "INVENTORY"
    | "SALES_REVENUE"
    | "SERVICE_REVENUE"
    | "RENT_EXPENSE"
    | "SALARY_EXPENSE"
    | "UTILITIES_EXPENSE"
    | "OWNER_CAPITAL"
    | "RETAINED_EARNINGS" |
    "EXPENSE_ACCOUNT" |
    "TRANSFER_SOURCE" |
    "TRANSFER_DESTINATION" |
    "MAIN_CASH" |
    "BANK_ACCOUNT" |
    "OTHER_INCOME" |
    "CASH_DESTINATION" |
    "CASH_SOURCE" |
    "BANK_DESTINATION" |
    "BANK_SOURCE"
export type Rule = {
    account: AccountCode;
    type: "debit" | "credit";
};
export type { AccountingAlert, AlertSeverity, AlertType, JournalEntry, JournalEntryLine, Invoice }