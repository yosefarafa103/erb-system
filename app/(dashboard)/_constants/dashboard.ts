import { ERPModule } from "../_types";
import { User } from "../_types/users";
import {
  Users,
  Calculator,
  Boxes,
  ShoppingCart,
  Briefcase,
  ShoppingBag
} from "lucide-react";
export const erpModules: ERPModule[] = [
  {
    key: "users",
    icon: Users,
    title: {
      en: "User & Role Management",
      ar: "إدارة المستخدمين والصلاحيات"
    },
    description: {
      en: "Login, Register, RBAC, and multi-tenant user control system",
      ar: "تسجيل الدخول، التسجيل، إدارة الصلاحيات ونظام متعدد الشركات"
    },
    path: "/dashboard/users",
    allowedRoles: ["admin"]
  } as const,

  {
    key: "accounting",
    icon: Calculator,
    title: {
      en: "Accounting & Finance",
      ar: "المحاسبة والمالية"
    },
    description: {
      en: "Invoices, General Ledger, payments, and financial reports",
      ar: "الفواتير، دفتر الأستاذ، المدفوعات والتقارير المالية"
    },
    path: "/dashboard/accounting",
    allowedRoles: ["admin", "manager"]
  },

  {
    key: "inventory",
    icon: Boxes,
    title: {
      en: "Inventory Management",
      ar: "إدارة المخزون"
    },
    description: {
      en: "Stock tracking, warehouses, SKU system, low stock alerts",
      ar: "تتبع المخزون، المخازن، نظام SKU وتنبيهات النقص"
    },
    path: "/dashboard/inventory",
    allowedRoles: ["admin", "manager"]
  },

  {
    key: "sales",
    icon: ShoppingCart,
    title: {
      en: "Sales Management",
      ar: "إدارة المبيعات"
    },
    description: {
      en: "Orders, CRM, quotes, and sales analytics",
      ar: "الطلبات، إدارة العملاء، عروض الأسعار وتحليلات المبيعات"
    },
    path: "/dashboard/sales",
    allowedRoles: ["admin", "manager", "accounting"]
  },

  {
    key: "hr",
    icon: Briefcase,
    title: {
      en: "HR Management",
      ar: "إدارة الموارد البشرية"
    },
    description: {
      en: "Employees, attendance, leave, payroll, performance tracking",
      ar: "الموظفين، الحضور، الإجازات، الرواتب وتقييم الأداء"
    },
    path: "/dashboard/hr",
    allowedRoles: ["admin", "manager"]
  },

  {
    key: "purchase",
    icon: ShoppingBag,
    title: {
      en: "Purchase Management",
      ar: "إدارة المشتريات"
    },
    description: {
      en: "Suppliers, purchase orders, deliveries, vendor payments",
      ar: "الموردين، أوامر الشراء، التسليمات ومدفوعات الموردين"
    },
    path: "/dashboard/purchase",
    allowedRoles: ["admin", "manager"]
  }
]


export const users: User[] = [
  {
    id: "1",
    name: "أحمد علي",
    description: "مدير عام",
    image: "https://i.pravatar.cc/150?img=1",
    role: "admin",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "2",
    name: "سارة محمد",
    description: "مدير",
    image: "https://i.pravatar.cc/150?img=2",
    role: "manager",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "3",
    name: "عمر حسن",
    description: "محاسب",
    image: "https://i.pravatar.cc/150?img=3",
    role: "accounting",
    status: { ar: "غير مفعل", en: "disabled" }
  },

  {
    id: "4",
    name: "محمد طارق",
    description: "مدير عام",
    image: "https://i.pravatar.cc/150?img=4",
    role: "admin",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "5",
    name: "نور خالد",
    description: "مدير عام",
    image: "https://i.pravatar.cc/150?img=5",
    role: "admin",
    status: { ar: "غير مفعل", en: "disabled" }
  },

  {
    id: "6",
    name: "يوسف عادل",
    description: "مدير",
    image: "https://i.pravatar.cc/150?img=6",
    role: "manager",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "7",
    name: "منى سامي",
    description: "مدير",
    image: "https://i.pravatar.cc/150?img=7",
    role: "manager",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "8",
    name: "حسن محمود",
    description: "مدير",
    image: "https://i.pravatar.cc/150?img=8",
    role: "manager",
    status: { ar: "غير مفعل", en: "disabled" }
  },

  {
    id: "9",
    name: "فاطمة علي",
    description: "محاسب",
    image: "https://i.pravatar.cc/150?img=9",
    role: "accounting",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "10",
    name: "كريم نبيل",
    description: "محاسب",
    image: "https://i.pravatar.cc/150?img=10",
    role: "accounting",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "11",
    name: "سلمى هاني",
    description: "محاسب",
    image: "https://i.pravatar.cc/150?img=11",
    role: "accounting",
    status: { ar: "غير مفعل", en: "disabled" }
  },

  {
    id: "12",
    name: "علي مصطفى",
    description: "مدير",
    image: "https://i.pravatar.cc/150?img=12",
    role: "manager",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "13",
    name: "هدى إبراهيم",
    description: "محاسب",
    image: "https://i.pravatar.cc/150?img=13",
    role: "accounting",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "14",
    name: "تامر سعيد",
    description: "مدير عام",
    image: "https://i.pravatar.cc/150?img=14",
    role: "admin",
    status: { ar: "مفعل", en: "enabled" }
  },
  {
    id: "15",
    name: "رانيا فتحي",
    description: "مدير",
    image: "https://i.pravatar.cc/150?img=15",
    role: "manager",
    status: { ar: "غير مفعل", en: "disabled" }
  }
];