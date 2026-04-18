"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginInput, loginSchema } from "../_lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginInput>({
        // @ts-ignore
        resolver: zodResolver(loginSchema)
    });
    const router = useRouter()
    const onSubmit = async (data: LoginInput) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const fakeUser = {
                email: "test@example.com",
                password: "123456"
            };
            if (
                data.email === fakeUser.email &&
                data.password === fakeUser.password
            ) {
                console.log("Logged in ✅");

                router.push("/dashboard");
            } else {
                alert("Invalid email or password")
                // throw new Error("Invalid email or password");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Email</Label>
                        <Input {...register("email")} />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input type="password" {...register("password")} />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    <Button className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
