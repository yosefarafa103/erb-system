"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginInput, loginSchema } from "../_lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import { loginAction } from "../_actions/loginAction";
import { showToast } from "@/helpers/toast";
export function LoginForm() {
    const [isPending, startTransition] = useTransition();
    const {
        register,
        formState: { errors, isSubmitting }
    } = useForm<LoginInput>({
        // @ts-ignore
        resolver: zodResolver(loginSchema)
    });
    const handleSubmitAPI = (formData: FormData) => {
        startTransition(async () => {
            try {
                const result = await loginAction(formData);
                showToast("success", "تم تسجيل الدخول بنجاح", "", "rtl")
                localStorage.setItem("userId", result?.user?._id)
                localStorage.setItem("token", result?.token)
                if (result.user) return redirect("/")
            } catch (error: any) {
                showToast("error", error.message, "", "rtl")
            }
        });
    };

    const router = useRouter()


    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle> تسجيل الدخول </CardTitle>
            </CardHeader>
            <CardContent>
                <form action={handleSubmitAPI} className="space-y-4">
                    <>
                        <Label> الايميل </Label>
                        <Input {...register("email")} />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </>

                    <>
                        <Label> كلمة المرور </Label>
                        <Input type="password" {...register("password")} />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </>

                    <Button className="w-full" disabled={isSubmitting}>
                        {isPending ? "Loading..." : "Login"}
                    </Button>
                </form>
            </CardContent>

        </Card>
    );
}
