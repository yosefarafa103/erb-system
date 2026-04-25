import { create } from "zustand";
import { erpModules } from "../_constants/dashboard";

type Keys = (typeof erpModules)[number]["key"];
type SearchState<T> = {
    searchMap: Record<Keys, string>;
    setSearch: (pathname: Keys, value: string) => T;
    getSearch: (pathname: Keys) => string;
    resetSearch: (pathname: string) => void;
};
export const useGlobalSearch = create<SearchState<{}>>((set, get) => ({
    // @ts-ignore
    searchMap: {},
    setSearch: (pathname, value) => {
        set((state) => ({
            searchMap: {
                ...state.searchMap,
                [pathname]: value
            }
        }))
        return value
    },
    getSearch: (pathname) => {
        return get().searchMap[pathname] || "";
    },

    resetSearch: (pathname) =>
        set((state) => ({
            searchMap: {
                ...state.searchMap,
                [pathname]: ""
            }
        }))
}));