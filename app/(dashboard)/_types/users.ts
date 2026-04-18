import { Role } from ".";

type Status = "enabled" | "disabled";

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
type UserRow = {
    id: string;
    account: string;
    email: string;
    role: Role;
    access: "full" | "limited" | "read";
    status: Status;
};
export type { User, Status, UserRow }