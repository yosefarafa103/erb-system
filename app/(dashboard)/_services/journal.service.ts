"use server"
import { url } from "@/app/(auth)/_services/auth.service"
import { getToken } from "../_helpers/getToken"
import { cacheTag } from "next/cache"
import { JournalEntry } from "../_types/accounting"

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
    try {
        const token = (await getToken())?.value
        const res = await fetch(`${url}/journal-entries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err.message || "Failed to fetch journal entries")
        }

        return await res.json()
    } catch (error: any) {
        throw new Error(error.message || "Something went wrong")
    }
}