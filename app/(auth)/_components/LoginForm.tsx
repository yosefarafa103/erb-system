"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { loginAction } from "../_actions/loginAction";
import { showToast } from "@/helpers/toast";
export function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const handleSubmitAPI = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await loginAction(formData);
                showToast("success", "تم تسجيل الدخول بنجاح", "", "rtl")
                localStorage.setItem("userId", result.user._id)
                localStorage.setItem("token", result.token)
                localStorage.setItem("currentTenent", result.user.lastActiveTenant)
                redirect("/")
            } catch (error: any) {
                showToast("error", error.message, "", "rtl")
            }
        });
    };
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle> تسجيل الدخول </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmitAPI} className="space-y-4">
                    <>
                        <Label> الايميل </Label>
                        <Input name="email" />
                    </>
                    <>
                        <Label> كلمة المرور </Label>
                        <Input type="password" name="password" />
                    </>
                    <Button className="w-full" disabled={isPending}>
                        {isPending ? "Loading..." : "Login"}
                    </Button>
                </form>
            </CardContent>

        </Card>
    );
}
