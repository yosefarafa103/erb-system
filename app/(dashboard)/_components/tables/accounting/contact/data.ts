import { Contact } from "@/app/(dashboard)/_types/accounting";

export const contacts: Contact[] = [
    {
        id: "CUST-001",
        name: "أحمد محمد",
        type: "customer",
        phone: "01012345678",
        email: "ahmed@gmail.com",
        balance: 5000,
        createdAt: "2026-04-01",
    },
    {
        id: "VEND-001",
        name: "شركة النور",
        type: "vendor",
        phone: "01123456789",
        email: "info@noor.com",
        balance: -12000,
        createdAt: "2026-04-02",
    },
    {
        id: "CUST-002",
        name: "محمد علي",
        type: "customer",
        phone: "01234567890",
        email: "mohamed@gmail.com",
        balance: 0,
        createdAt: "2026-04-03",
    },
    {
        id: "VEND-002",
        name: "Delta Supplies",
        type: "vendor",
        phone: "01555555555",
        email: "contact@delta.com",
        balance: -8000,
        createdAt: "2026-04-04",
    },
    {
        id: "CUST-003",
        name: "Sara Ahmed",
        type: "customer",
        phone: "01099999999",
        email: "sara@gmail.com",
        balance: 2000,
        createdAt: "2026-04-05",
    },
];