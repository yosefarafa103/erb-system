import { UserRow } from "../../_types/users";

export const adminDataTable: UserRow[] = [
    {
        id: "1",
        account: "أحمد علي",
        email: "ahmed@example.com",
        role: "admin",
        access: "full",
        status: "enabled"
    },
    {
        id: "2",
        account: "سارة محمد",
        email: "sara@example.com",
        role: "manager",
        access: "limited",
        status: "enabled"
    },
    {
        id: "3",
        account: "عمر حسن",
        email: "omar@example.com",
        role: "accounting",
        access: "read",
        status: "disabled"
    },
    {
        id: "4",
        account: "احمد احمد",
        email: "omar@example.com",
        role: "manager",
        access: "read",
        status: "disabled"
    }
];