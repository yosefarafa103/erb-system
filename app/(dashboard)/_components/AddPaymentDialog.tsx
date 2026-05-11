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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
    invoiceId: string;
    customerId: string;
    totalAmount: number;
};

export default function AddPaymentDialog({
    invoiceId,
    customerId,
    totalAmount,
}: Props) {
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] =
        useTransition();

    const [formData, setFormData] = useState({
        amount: totalAmount,
        method: "cash",
        notes: "",
        status: "completed",
    });
    console.log(formData);

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                const payload = new FormData();

                payload.append("invoiceId", invoiceId);

                payload.append(
                    "customerId",
                    customerId
                );

                payload.append(
                    "amount",
                    formData.amount.toString()
                );

                payload.append(
                    "method",
                    formData.method
                );

                payload.append(
                    "notes",
                    formData.notes
                );

                payload.append(
                    "status",
                    formData.status
                );

                payload.append(
                    "tenantId",
                    localStorage.getItem(
                        "currentTenent"
                    ) || ""
                );

                payload.append(
                    "createdBy",
                    localStorage.getItem(
                        "userId"
                    ) || ""
                );

                await createPaymentAction(payload);

                setOpen(false);
            } catch (error) {
                console.log(error);
            }
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
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

                <div className="space-y-5 mt-4">
                    <div className="space-y-2">
                        <Label>
                            المبلغ المدفوع
                        </Label>

                        <div className="relative">
                            <DollarSign className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />

                            <Input
                                type="number"
                                min={1}
                                className="pl-9"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        amount: Number(
                                            e.target.value
                                        ),
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>
                            طريقة الدفع
                        </Label>

                        <Select
                            dir="rtl"
                            value={formData.method}
                            onValueChange={(e) =>
                                setFormData({
                                    ...formData,
                                    method:
                                        e,
                                })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="اختر طريفة الدفع" />
                            </SelectTrigger>
                            <SelectContent>

                                <SelectItem value="cash">
                                    نقدي
                                </SelectItem>

                                <SelectItem value="card">
                                    بطاقة
                                </SelectItem>

                                <SelectItem value="bank">
                                    تحويل بنكي
                                </SelectItem>

                                <SelectItem value="wallet">
                                    محفظة إلكترونية
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    <div className="space-y-2">
                        <Label>
                            ملاحظات
                        </Label>

                        <textarea
                            rows={4}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="أضف أي ملاحظات..."
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    notes:
                                        e.target.value,
                                })
                            }
                        />
                    </div>

                    <Separator />

                    {/* summary */}
                    <div className="rounded-lg border p-4 bg-muted/30">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                إجمالي الفاتورة
                            </span>

                            <span className="font-bold">
                                {new Intl.NumberFormat(
                                    "ar-EG",
                                    {
                                        style:
                                            "currency",
                                        currency:
                                            "EGP",
                                    }
                                ).format(totalAmount)}
                            </span>
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                                setOpen(false)
                            }
                        >
                            إلغاء
                        </Button>

                        <Button
                            type="button"
                            disabled={isPending}
                            className="flex-1"
                            variant="purple"
                            onClick={
                                handleSubmit
                            }
                        >
                            {isPending ? (
                                <Loader className="w-4 h-4 animate-spin ml-2" />
                            ) : (
                                <Save className="w-4 h-4 ml-2" />
                            )}

                            {isPending
                                ? "جاري الحفظ..."
                                : "حفظ الدفعة"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}