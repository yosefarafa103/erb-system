import { AccountingAlert, JournalEntry } from "../_types/accounting";

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

export const journalEntries: JournalEntry[] = [
    {
        id: "JE-001",
        date: "2024-04-20",
        description: "سداد مصروف ايجار المكتب شهر ابريل",
        totalCredit: 10000,
        totalDebit: 10000,
        status: "posted",
        lines: [{
            id: "JEL-001",
            accountCode: "5001",
            accountName: "مصروف ايجار",
            description: "ايجار شهر 4",
            debit: 10000,
            credit: 0
        },
        {
            id: "JEL-002",
            accountCode: "5002",
            accountName: "مصروف ايجار",
            description: "ايجار شهر 4",
            debit: 10000,
            credit: 0
        }],
        createdAt: "2025-10-05",
        reference: "عقد ايجار"
    },
    {
        id: "JE-001",
        date: "2024-04-20",
        description: "سداد مصروف ايجار المكتب شهر ابريل",
        totalCredit: 10000,
        totalDebit: 10000,
        status: "posted",
        lines: [{
            id: "JEL-001",
            accountCode: "5001",
            accountName: "مصروف ايجار",
            description: "ايجار شهر 4",
            debit: 10000,
            credit: 0
        }],
        createdAt: "2025-10-05",
        reference: "عقد ايجار"
    },
    {
        id: "JE-001",
        date: "2024-04-20",
        description: "سداد مصروف ايجار المكتب شهر ابريل",
        totalCredit: 10000,
        totalDebit: 10000,
        status: "posted",
        lines: [{
            id: "JEL-001",
            accountCode: "5001",
            accountName: "مصروف ايجار",
            description: "ايجار شهر 4",
            debit: 10000,
            credit: 0
        }],
        createdAt: "2025-10-05",
        reference: "عقد ايجار"
    }
] 