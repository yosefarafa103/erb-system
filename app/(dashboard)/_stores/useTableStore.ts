import { create } from "zustand";
import { Role } from "../_types";
type RoleType = Role | "all"
type TableFiltersState = {
    search: string;
    role: RoleType
    status: string;
    setSearch: (value: string) => void;
    setRole: (value: RoleType) => void;
    setStatus: (value: string) => void;
    reset: () => void;
};

export const useTableFilters = create<TableFiltersState>((set) => ({
    search: "",
    role: "all",
    status: "all",
    setSearch: (value) => set({ search: value }),
    setRole: (value) => set({ role: value }),
    setStatus: (value) => set({ status: value }),
    reset: () =>
        set({
            search: "",
            role: "all",
            status: "all"
        })
}));