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
            account: "",
            debit: 10000,
            credit: 0
        },
        {
            "account": "",
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
            "account": "",
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
            "account": "",
            debit: 10000,
            credit: 0
        }],
        createdAt: "2025-10-05",
        reference: "عقد ايجار"
    }
]


export const ProfitLoss = [
    { month: "Jan", revenue: 20000, expense: 12000 },
    { month: "Feb", revenue: 25000, expense: 15000 },
    { month: "Mar", revenue: 18000, expense: 10000 }
]

const expensesBreakdown = [
    { category: "Rent", amount: 10000 },
    { category: "Salaries", amount: 30000 },
    { category: "Marketing", amount: 5000 }
]

const revenue = [
    { month: "Jan", revenue: 20000 },
    { month: "Feb", revenue: 25000 },
    { month: "Mar", revenue: 18000 }
]

const cashFlow = [
    { month: "Jan", in: 30000, out: 20000 },
    { month: "Feb", in: 25000, out: 22000 },
    { month: "Mar", in: 28000, out: 21000 }
]