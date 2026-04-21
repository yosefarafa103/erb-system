import { Role } from ".";
import { ITenant as Tenent } from "./tenents";

type Status = "enabled" | "disabled";
export type ITenant = {
    tenantId: Tenent;
    role: string;
    permissions: any[];
    status: "active" | "inactive";
    joinedAt: Date;
};
type User = {
    id: string;
    name: string;
    description: string;
    image: string;
    status: {
        ar: string;
        en: Status
    };
    role: Role;
};
type UserRow = User

type GetMeReponseType = {
    name: string,
    _id: string;
    email: string,
    tenants: ITenant[],
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    lastActiveTenant: string
}

export type { User, Status, UserRow, GetMeReponseType, ITenant as Tenent }