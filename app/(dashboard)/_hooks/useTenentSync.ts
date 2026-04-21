"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STORAGE_KEY = "currentTenent";

export const useTenantSync = (defaultTenant?: string) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [tenant, setTenant] = useState<string>("");

    useEffect(() => {
        const urlTenant = searchParams.get("tenant");
        const storedTenant =
            typeof window !== "undefined"
                ? localStorage.getItem(STORAGE_KEY)
                : null;

        const initial =
            urlTenant || storedTenant || defaultTenant || "";

        if (initial) {
            setTenant(initial);
            localStorage.setItem(STORAGE_KEY, initial);

            if (!urlTenant) {
                router.replace(`?tenant=${initial}`);
            }
        }
    }, []);

    const updateTenant = (newTenant: string) => {
        setTenant(newTenant);
        localStorage.setItem(STORAGE_KEY, newTenant);
        router.push(`?tenant=${newTenant}`);
    };

    return {
        tenant,
        setTenant: updateTenant,
    };
};