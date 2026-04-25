import { create } from "zustand";
import { Invoice } from "../_types/accounting";
import { invoices } from "../_components/tables/accounting/invoice/data";


type Store = {
    invoices: Invoice[];
    addInvoice: (inv: Invoice) => void;
};

export const useInvoiceStore = create<Store>((set) => ({
    invoices: invoices,

    addInvoice: (inv) =>
        set((state) => ({
            invoices: [inv, ...state.invoices],
        })),
}));