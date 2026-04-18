import type { UserRow } from "../_types/users";

export const selectFilteredUsers = (
    data: UserRow[],
    search: string,
    role: string,
    status: string
) => {
    return data.filter((user) => {

        const matchSearch =
            user.account.includes(search) ||
            user.email.includes(search);
        const matchRole = role === "all" || user.role === role;
        const matchStatus = status === "all" || user.status === status;

        return matchSearch && matchRole && matchStatus;
    });
};