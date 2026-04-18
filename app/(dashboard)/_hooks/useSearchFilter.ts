"use client";

import { useMemo } from "react";

type UseGlobalFilterProps<T> = {
    data: T[];
    search: string;
    keys: (keyof T)[];
};

export function useGlobalFilter<T>({
    data,
    search,
    keys
}: UseGlobalFilterProps<T>) {
    const filteredData = useMemo(() => {
        if (!search) return data;
        const lower = search.toLowerCase();
        return data.filter((item) =>
            keys.some((key) => {
                const value = item[key];
                return String(value)
                    .toLowerCase()
                    .includes(lower);
            })
        );
    }, [data, search, keys]);

    return filteredData;
}