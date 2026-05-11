import { Rule } from "../_types/accounting";

export const accountingRules: Record<string, Rule[]> = {

    // 🟢 بيع نقدي
    SALE_CASH: [
        { account: "BANK", type: "debit" },
        { account: "SALES_REVENUE", type: "credit" },
    ],

    // 🟢 بيع آجل
    SALE_CREDIT: [
        { account: "ACCOUNTS_RECEIVABLE", type: "debit" },
        { account: "SALES_REVENUE", type: "credit" },
    ],

    // 🔴 شراء نقدي
    PURCHASE_CASH: [
        { account: "INVENTORY", type: "debit" },
        { account: "BANK", type: "credit" },
    ],

    // 🔴 شراء آجل
    PURCHASE_CREDIT: [
        { account: "INVENTORY", type: "debit" },
        { account: "ACCOUNTS_PAYABLE", type: "credit" },
    ],

    // 🔵 تحصيل من عميل
    CUSTOMER_PAYMENT_CASH: [
        { account: "BANK", type: "debit" },
        { account: "ACCOUNTS_RECEIVABLE", type: "credit" },
    ],

    CUSTOMER_PAYMENT_BANK: [
        { account: "BANK", type: "debit" },
        { account: "ACCOUNTS_RECEIVABLE", type: "credit" },
    ],

    // 🟠 سداد مورد
    SUPPLIER_PAYMENT_CASH: [
        { account: "ACCOUNTS_PAYABLE", type: "debit" },
        { account: "BANK", type: "credit" },
    ],

    SUPPLIER_PAYMENT_BANK: [
        { account: "ACCOUNTS_PAYABLE", type: "debit" },
        { account: "BANK", type: "credit" },
    ],

    EXPENSE_CASH: [
        { account: "EXPENSE_ACCOUNT", type: "debit" }, // dynamic
        { account: "MAIN_CASH", type: "credit" },
    ],

    EXPENSE_BANK: [
        { account: "EXPENSE_ACCOUNT", type: "debit" },
        { account: "BANK_ACCOUNT", type: "credit" },
    ],
    // 🟣 إيراد مباشر
    INCOME_CASH: [
        { account: "BANK", type: "debit" },
        { account: "OTHER_INCOME", type: "credit" },
    ],

    // ⚪ تحويل بين حسابات
    CASH_TRANSFER: [
        { account: "CASH_DESTINATION", type: "debit" },
        { account: "CASH_SOURCE", type: "credit" },
    ],

    BANK_TRANSFER: [
        { account: "BANK_DESTINATION", type: "debit" },
        { account: "BANK_SOURCE", type: "credit" },
    ],

    // ⚫ قيد يدوي
    MANUAL: [
        // بيتحدد ديناميك من المستخدم
    ],

    // 🟤 رصيد افتتاحي
    OPENING_BALANCE: [
        // حسب الحسابات المدخلة
    ],
};