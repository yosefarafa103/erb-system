"use client";

import { useState, useMemo, useCallback, useTransition, useEffect } from "react";
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
import { Plus, Save, Trash2, ReceiptText, Percent, Loader } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { createInvoiceAction } from "../_actions/createInvoice";
import InvoiceItems from "./InvoiceItems";
import { useAllProducts } from "../_hooks/useGetAllProducts";
export type InvoiceItem = {
    productId?: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
};

export default function AddInvoiceDialog({ token }: { token: string }) {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        customerId: "",
        discount: 0,
        status: "draft",
        productId: ""
    });

    const [items, setItems] = useState<InvoiceItem[]>([
        { name: "", quantity: 1, price: 0, total: 0, productId: "69fa14e7ddb95d36af602f15" },
    ]);

    const addItem = useCallback(() => {
        setItems((prev) => [
            ...prev,

            { name: "", quantity: 1, price: 0, total: 0, },
        ]);
    }, []);

    const totals = useMemo(() => {
        const subTotal = items.reduce((sum, item) => sum + item.total, 0);
        const tax = subTotal * 0.14;
        const total = subTotal + tax - (formData.discount || 0);

        return { subTotal, tax, total };
    }, [items, formData.discount]);
    const [isPending, startTransition] = useTransition();
    const handleSubmit = () => {
        startTransition(async () => {
            const formDataPayload = new FormData();
            formDataPayload.append("customerId", formData.customerId);
            formDataPayload.append("subTotal", totals.subTotal.toString());
            formDataPayload.append("tax", totals.tax.toString());
            formDataPayload.append("discount", formData.discount.toString());
            formDataPayload.append("total", totals.total.toString());
            formDataPayload.append("status", formData.status);
            formDataPayload.append("items", JSON.stringify(items));
            formDataPayload.append("tenantId", (localStorage.getItem("currentTenent")!));
            formDataPayload.append("createdBy", (localStorage.getItem("userId")!));
            try {
                await createInvoiceAction(formDataPayload);
                setOpen(false);
            } catch (error) {
                console.error("Error saving invoice:", error);
            }
        });
    };
    const { data, isLoading, isError } = useAllProducts(token)
    console.log(data);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                    <Plus className="w-5 h-5" /> فاتورة جديدة
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
                        <ReceiptText className="text-purple-600" /> تفاصيل الفاتورة
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                        <Label>معرف العميل (Customer ID)</Label>
                        <Input
                            name="customerId"
                            value={formData.customerId}
                            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>الحالة</Label>
                        <select
                            className="w-full h-10 px-3 rounded-md border border-input bg-background"
                            name="status"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                            <option value="draft">Draft (مسودة)</option>
                            <option value="confirmed">Confirmed (مؤكدة)</option>
                            <option value="paid">Paid (مدفوعة)</option>
                        </select>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-3 px-2 text-sm font-semibold text-muted-foreground">
                        <div className="col-span-5">الصنف / المنتج</div>
                        <div className="col-span-2">الكمية</div>
                        <div className="col-span-2">السعر</div>
                        <div className="col-span-2">الإجمالي</div>
                        <div className="col-span-1"></div>
                    </div>

                    <InvoiceItems products={data || []} setItems={setItems} items={items} />

                    <Button variant="outline" onClick={addItem} className="w-full border-dashed">
                        <Plus className="w-4 h-4 ml-2" /> إضافة صنف
                    </Button>
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="w-full md:w-1/3 space-y-2">
                        <Label className="flex items-center gap-2 text-orange-600">
                            <Percent className="w-4 h-4" /> خصم إضافي
                        </Label>
                        <Input
                            name="discount"
                            type="number"
                            value={formData.discount}
                            onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                        />
                    </div>

                    <div className="w-full md:w-64 space-y-3 bg-background p-4 rounded-lg border">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">المجموع قبل الضريبة:</span>
                            <span>{totals.subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">الضريبة (14%):</span>
                            <span>{totals.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-red-500">
                            <span>الخصم:</span>
                            <span>-{formData.discount.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg text-purple-800">
                            <span>الإجمالي النهائي:</span>
                            <span>{totals.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                        إلغاء
                    </Button>
                    <Button disabled={isPending} className="flex-2 bg-purple-600 hover:bg-purple-700 text-foreground" type="submit" onClick={handleSubmit}>
                        {isPending ? <Loader className="w-4 h-4 ml-2" /> : <Save className="w-4 h-4 ml-2" />}
                        {
                            isPending ? `
                        جاري الحفظ..`
                                :
                                `
                     حفظ في قاعدة البيانات
                        `
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    );
}


