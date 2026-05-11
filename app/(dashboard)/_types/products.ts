export interface IProduct {
    _id: string;
    tenantId: string;
    name: string;
    sku?: string;
    barcode?: string;
    description?: string;
    price: number;
    cost: number;
    quantity: number;
    unit: string;
    isActive: boolean;
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}