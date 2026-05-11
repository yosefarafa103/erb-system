
export interface IInvoiceItem {
    productId?: string; // الاختياري لأنه قد يكون صنف حر غير موجود بالمنتجات
    name: string;
    quantity: number;
    price: number;
    total: number;
}

export type InvoiceStatus = "draft" | "confirmed" | "partial" | "paid" | "cancelled";

export interface IInvoice {
    _id: string;
    tenantId: string;
    customerId: string;
    items: IInvoiceItem[];
    subTotal: number;
    tax: number;
    discount: number;
    total: number;
    status: InvoiceStatus;
    createdBy: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export interface IInvoiceWithCustomer extends Omit<IInvoice, 'customerId'> {
    customerId: {
        _id: string;
        name: string;
        email?: string;
    };
}