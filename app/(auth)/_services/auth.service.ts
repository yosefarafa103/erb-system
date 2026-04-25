import { cookies } from "next/headers";
import type { GetMeReponseType as User } from "../../(dashboard)/_types/users";
type LoginResponse = {
  user: User
  token: string
}
export const url = process.env.NODE_ENV === "production" ? process.env.BACKEND_BASE : process.env.BACKEND_BASE_LOCAL_HOST
export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(
      `${url}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data: Promise<LoginResponse> = await res.json();
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
// Only On Server
export async function getCurrentUser(): Promise<User> {
  const token = (await cookies()).get("token")?.value
  try {
    const currentUser = (await fetch(`${url}/users/get-me`, {
      credentials: "include",
      headers: {
        "authorization": `Bearer ${token} `
      }
    }));
    return currentUser.json()
  } catch (error) {
    throw new Error("failed to get your accout please login and try again")
  }
}
