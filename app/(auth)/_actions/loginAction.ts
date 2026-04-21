"use server";
import { cookies } from "next/headers";
import { login } from "../_services/auth.service";
export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        const Cookies = await cookies()
        const user = await login(email, password);
        Cookies.set("token", user.token!)
        return user
    } catch (error: any) {
        throw new Error(error.message)
    }
}