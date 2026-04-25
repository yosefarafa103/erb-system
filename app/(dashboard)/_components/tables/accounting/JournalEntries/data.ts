import { JournalEntry } from "@/app/(dashboard)/_types/accounting";

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