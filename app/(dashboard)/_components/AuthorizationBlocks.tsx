"use client";

import { RoleBlock } from "./RoleBlock";
import { users } from "../constants/dashboard";
import { useGlobalSearch } from "../stores/useGlobalSearch";
import { useMemo } from "react";

const AuthorizationBlocks = () => {
    const { searchMap } = useGlobalSearch()
    const roleMap = {
        admin: "مدير عام",
        manager: "مدير",
        accounting: "محاسب"
    }
    const groups = useMemo(() => Object.entries(roleMap).map(([role, desc]) => ({
        role,
        title: desc,
        users: users.filter((u) => u.description === desc && u.name.includes(searchMap.users)
        )
    })), [searchMap.users]);
    return (
        <>
            {groups.map((group) => (
                <RoleBlock
                    key={group.role}
                    role={group.role as any}
                    title={group.title}
                    users={group.users}
                />
            ))}
        </>
    );
};

export default AuthorizationBlocks;