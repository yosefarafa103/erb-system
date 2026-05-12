"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

import { useTransition } from "react";

import { loginAction } from "../_actions/loginAction";

import { showToast } from "@/helpers/toast";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z
        .email({ error: "بريد غير صحيح" })
        .min(
            1,
            "يرجى إدخال البريد الإلكتروني"
        )
    ,
    password: z
        .string(
    )
        .min(
            1,
            "يرجى إدخال كلمة المرور"
        )
        .min(
            6,
            "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
        ),
});

type LoginFormValues = z.infer<
    typeof loginSchema
>;

export function LoginForm() {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver:
            zodResolver(loginSchema),
    });

    const onSubmit = (
        values: LoginFormValues
    ) => {
        startTransition(async () => {
            try {
                showToast(
                    "info",
                    "جاري تسجيل الدخول...",
                    "",
                    "rtl"
                );

                const formData =
                    new FormData();

                formData.append(
                    "email",
                    values.email
                );

                formData.append(
                    "password",
                    values.password
                );

                const result =
                    await loginAction(
                        formData
                    );

                showToast(
                    "success",
                    "تم تسجيل الدخول بنجاح",
                    "",
                    "rtl"
                );

                localStorage.setItem(
                    "userId",
                    result.user._id
                );

                localStorage.setItem(
                    "currentTenent",
                    result.user
                        .lastActiveTenant
                );

                router.push(
                    "/dashboard/users"
                );
            } catch (error: any) {
                showToast(
                    "error",
                    error.message ||
                    "حدث خطأ أثناء تسجيل الدخول",
                    "",
                    "rtl"
                );
            }
        });
    };



    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>
                    تسجيل الدخول
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(
                        onSubmit,
                    )}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label>
                            البريد الإلكتروني
                        </Label>

                        <Input
                            type="email"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>
                            كلمة المرور
                        </Label>

                        <Input
                            type="password"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="purple"
                        className="w-full"
                        disabled={
                            isPending
                        }
                    >
                        {isPending
                            ? "جاري تسجيل الدخول..."
                            : "تسجيل الدخول"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}