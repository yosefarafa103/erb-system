import type { GetMeReponseType, UserRow } from "../_types/users";

export const selectFilteredUsers = (
    data: GetMeReponseType[],
    search: string,
    role: string,
    status: string
) => {
    return data.filter((user) => {
        const currentTenent = user.tenants.filter(t => t.tenantId._id === user.lastActiveTenant)
        const matchSearch =
            user.name.includes(search) ||
            user.email.includes(search);
        const matchRole = role === "all" || currentTenent[0].role === role;
        const matchStatus = status === "all" || currentTenent[0]?.status === status;

        return matchSearch && matchRole && matchStatus
    });
};