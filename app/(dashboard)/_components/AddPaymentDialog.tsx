"use client";

import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    CreditCard,
    DollarSign,
    Loader,
    Plus,
    Save,
} from "lucide-react";
import { createPaymentAction } from "@/app/(dashboard)/_actions/payments";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/toast";
import { usePaymentStatus } from "../_hooks/usePaymentsStatus";

type Props = {
    invoiceId: string;
    customerId: string;
};
const methods = ["cash", "card", "bank", "wallet"] as const
const paymentSchema = z.object({
    amount: z.coerce
        .number()
        .min(1, "المبلغ يجب أن يكون أكبر من صفر"),
    method: z.enum(methods, {
        errorMap: () => ({ message: "يرجى اختيار طريقة الدفع" }),
    }),
    notes: z.string().optional(),
    status: z.enum(["completed", "pending"]).default("completed"),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function AddPaymentDialog({
    invoiceId,
    customerId,
}: Props) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { data, isLoading } = usePaymentStatus(invoiceId, open);

    const totalAmount = data?.total || 0;
    const remainingAmount = data?.remaining || 0;
    const paidAmount = data?.paid || 0;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: 0,
            method: "cash",
            notes: "",
            status: "completed",
        },
    });

    const method = watch("method");

    const onSubmit = (values: PaymentFormValues) => {
        if (values.amount > remainingAmount) {
            setError("amount", {
                type: "manual",
                message: `المبلغ لا يمكن أن يتجاوز المتبقي (${remainingAmount})`,
            });
            return;
        }

        const payload = new FormData();
        payload.append("invoiceId", invoiceId);
        payload.append("customerId", customerId);
        payload.append("amount", values.amount.toString());
        payload.append("method", values.method);
        payload.append("notes", values.notes || "");
        payload.append("status", values.status);
        payload.append("tenantId", localStorage.getItem("currentTenent") || "");
        payload.append("createdBy", localStorage.getItem("userId") || "");

        startTransition(async () => {
            try {
                await createPaymentAction(payload);
                showToast("success", "تم إضافة دفعة بنجاح إلى الفاتورة", "", "rtl");
                setOpen(false);
            } catch (error: any) {
                showToast("error", error.message || "حدث خطأ أثناء إضافة الدفعة", "", "rtl");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-green-600 hover:bg-green-700 w-full ml-auto">
                    <Plus className="w-4 h-4" />
                    إضافة دفعة
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <CreditCard className="w-5 h-5 text-green-600" />
                        إضافة دفعة جديدة
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
                    <div className="space-y-2">
                        <Label>المبلغ المدفوع</Label>
                        <div className="relative">
                            <DollarSign className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                            <Input
                                type="number"
                                step="0.01"
                                className={`pl-9 ${errors.amount ? "border-red-500" : ""}`}
                                {...register("amount")}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.amount.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>طريقة الدفع</Label>
                        <Select
                            dir="rtl"
                            value={method}
                            onValueChange={(value) =>
                                setValue("method", value as any, { shouldValidate: true })
                            }
                        >
                            <SelectTrigger className={`w-full ${errors.method ? "border-red-500" : ""}`}>
                                <SelectValue placeholder="اختر طريقة الدفع" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cash">نقدي</SelectItem>
                                <SelectItem value="card">بطاقة</SelectItem>
                                <SelectItem value="bank">تحويل بنكي</SelectItem>
                                <SelectItem value="wallet">محفظة إلكترونية</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.method && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.method.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>ملاحظات</Label>
                        <textarea
                            rows={4}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="أضف أي ملاحظات..."
                            {...register("notes")}
                        />
                    </div>

                    <Separator />

                    <div className="rounded-lg border p-4 bg-muted/30 space-y-3">
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-sm">
                                <Loader className="w-4 h-4 animate-spin" />
                                جاري تحميل البيانات...
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">إجمالي الفاتورة</span>
                                    <span className="font-bold">
                                        {new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(totalAmount)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">المدفوع</span>
                                    <span className="font-bold text-green-600">
                                        {new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(paidAmount)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">المتبقي</span>
                                    <span className="font-bold text-red-600">
                                        {new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP" }).format(remainingAmount)}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setOpen(false)}
                        >
                            إلغاء
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || remainingAmount <= 0}
                            className="flex-1"
                            variant="purple"
                        >
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin ml-2" />
                            ) : (
                                <Save className="w-4 h-4 ml-2" />
                            )}
                            {isPending ? "جاري الحفظ..." : "حفظ الدفعة"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}