"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserInput, createUserSchema } from "../_schemas/users";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { useRef } from "react";
import { showToast } from "@/helpers/toast";
export function AddUserDialog() {
    const form = useForm<CreateUserInput>({
        // @ts-ignore
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "manager",
            status: "enabled",
            password: ""
        }
    });
    const dialog = useRef<HTMLButtonElement | null>(null)
    const onSubmit = (data: CreateUserInput) => {
        form.reset()
        dialog.current?.click()
        showToast("success", "تم اضافة العضو بنجاح", "العضو الذي قمت بتعبئة بياناتة تم اضافتة الي النظام", "rtl")
    };
    return (
        <Dialog
        >
            <DialogTrigger ref={dialog} asChild>
                <Button variant="purple">
                    اضافة عضو جديد
                    <HugeiconsIcon icon={PlusSignIcon} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>إضافة عضو جديد</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <Input
                        placeholder="الاسم"
                        {...form.register("name")}
                    />
                    <p className="text-red-400 text-xs">
                        {form.formState.errors.name?.message}
                    </p>
                    <Input
                        placeholder="البريد الإلكتروني"
                        {...form.register("email")}
                    />
                    <p className="text-red-400 text-xs">
                        {form.formState.errors.email?.message}
                    </p>
                    <Input
                        type="password"
                        placeholder="كلمة المرور"
                        {...form.register("password")}
                    />
                    <p className="text-red-400 text-xs">
                        {form.formState.errors.password?.message}
                    </p>
                    <select
                        className="w-full h-10 rounded-md bg-background border px-3 text-sm"
                        value={form.watch("role")}
                        onChange={(e) =>
                            form.setValue("role", e.target.value as any)
                        }
                    >
                        <option value="">اختر الدور</option>
                        <option value="admin">مدير عام</option>
                        <option value="manager">مدير</option>
                        <option value="accounting">محاسب</option>
                    </select>
                    <select
                        className="w-full h-10 rounded-md bg-background border px-3 text-sm"
                        value={form.watch("status")}
                        onChange={(e) =>
                            form.setValue("status", e.target.value as any)
                        }
                    >
                        <option value="enabled">مفعل</option>
                        <option value="disabled">غير مفعل</option>
                    </select>
                    <Button disabled={[form.watch().email, form.watch().name, form.watch().password].some((el) => !el.length)} type="submit" className="w-full" >
                        إضافة
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}