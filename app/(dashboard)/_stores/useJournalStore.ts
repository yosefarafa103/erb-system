import { create } from "zustand";
import { JournalEntry } from "@/app/(dashboard)/_types/accounting";
import { journalEntries as initialData } from "@/app/(dashboard)/constants/accounting";

type JournalStore = {
    entries: JournalEntry[];

    addEntry: (entry: JournalEntry) => void;
    setEntries: (entries: JournalEntry[]) => void;
    clearEntries: () => void;
};

export const useJournalStore = create<JournalStore>((set) => ({
    entries: initialData,

    addEntry: (entry) =>
        set((state) => ({
            entries: [entry, ...state.entries],
        })),

    setEntries: (entries) => set({ entries }),

    clearEntries: () => set({ entries: [] }),
}));