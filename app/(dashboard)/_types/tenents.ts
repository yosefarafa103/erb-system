type TenantPlan = 'free' | 'pro' | 'enterprise';
type TenantStatus = 'active' | 'suspended' | 'deleted';

export interface ITenant {
    _id: string;
    name: string;
    slug: string;
    domain?: string;
    ownerId: string;
    plan: TenantPlan;
    status: TenantStatus;
    settings: {
        currency: string;
        locale: string;
        timezone: string;
    };
    features: {
        inventory: boolean;
        hr: boolean;
        accounting: boolean;
    };
    billing?: {
        subscriptionId?: string;
        customerId?: string;
        currentPeriodEnd?: Date;
    };
    metadata?: Record<string, string>;
    createdAt?: Date;
    updatedAt?: Date;
}