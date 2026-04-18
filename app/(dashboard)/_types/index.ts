import { LucideIcon } from "lucide-react";

type DashboardServiceKey =
    | "dashboard"
    | "hr"
    | "inventory"
    | "analytics"
    | "users"
    | "reports"
    | "settings";

export type Role = "admin" | "manager" | "accounting";
export type ModuleKey =
    | "user_management"
    | "accounting"
    | "inventory"
    | "sales"
    | "hr"
    | "purchase";

export interface LocalizedText {
    en: string;
    ar: string;
}


export type ERPModule = {
    key: string;
    title: {
        en: string;
        ar: string;
    };
    description: {
        en: string;
        ar: string;
    };
    path: string;
    allowedRoles: string[];
    icon: LucideIcon;
};