import { url } from "@/app/(auth)/_services/auth.service";
import { getToken } from "../_helpers/getToken";
import { IInvoice } from "../_types/Invoices";

export async function getAllInvoices(): Promise<IInvoice[]> {
    try {
        const t = await getToken()
        return (await fetch(`${url}/invoices`, {
            headers: {
                Authorization: `Berear ${t?.value}`
            },
            next: { tags: ['invoices'] }
        })).json()
    } catch (error) {
        throw new Error("can Not Get invoices")
    }
}


export async function getTenentInvoices(tenentId: string): Promise<IInvoice[]> {
    try {
        const t = await getToken()
        return (await fetch(`${url}/invoices/tenents/${tenentId}`, {
            headers: {
                Authorization: `Berear ${t?.value}`
            },
            next: { tags: ['invoices', tenentId] }
        })).json()
    } catch (error) {
        throw new Error("can Not Get invoices")
    }
}