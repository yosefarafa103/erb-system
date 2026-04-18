"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "../_lib/validators";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignupInput>({
        // @ts-ignore
        resolver: zodResolver(signupSchema)
    });

    const onSubmit = async (data: SignupInput) => {
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("Signup failed");

            console.log("Account created");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input {...register("name")} />
                        {errors.name && (
                            <p className="text-red-500 text-sm">{errors.name.message}</p>
                        )}
                    </div>

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
                        {isSubmitting ? "Loading..." : "Create Account"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
