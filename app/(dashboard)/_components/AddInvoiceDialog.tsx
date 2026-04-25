"use client";

import { useState, useMemo, useCallback } from "react";
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
import { Plus, Save } from "lucide-react";

type Item = {
    id: string;
    name: string;
    qty: number;
    price: number;
};

export default function AddInvoiceDialog() {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        customer: "",
        date: "",
        dueDate: "",
    });

    const [items, setItems] = useState<Item[]>([
        { id: crypto.randomUUID(), name: "", qty: 1, price: 0 },
    ]);

    const addItem = useCallback(() => {
        setItems((prev) => [
            ...prev,
            { id: crypto.randomUUID(), name: "", qty: 1, price: 0 },
        ]);
    }, []);

    const updateItem = useCallback(
        (id: string, field: keyof Item, value: string) => {
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            [field]:
                                field === "name" ? value : Number(value),
                        }
                        : item
                )
            );
        },
        []
    );

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const { subtotal, tax, total } = useMemo(() => {
        const subtotal = items.reduce(
            (sum, i) => sum + i.qty * i.price,
            0
        );
        const tax = subtotal * 0.14;
        return {
            subtotal,
            tax,
            total: subtotal + tax,
        };
    }, [items]);

    const handleSubmit = useCallback(() => {
        const invoice = {
            id: `INV-${Date.now()}`,
            ...form,
            items,
            subtotal,
            tax,
            total,
            status: "draft",
        };
        setItems([
            { id: crypto.randomUUID(), name: "", qty: 1, price: 0 },
        ]);

        setForm({
            customer: "",
            date: "",
            dueDate: "",
        });

        setOpen(false);
    }, [form, items, subtotal, tax, total]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" variant="purple">
                    إنشاء فاتورة جديدة <Plus />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>إنشاء فاتورة جديدة</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3">
                    <div>
                        <Label>العميل</Label>
                        <Input
                            value={form.customer}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    customer: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label>التاريخ</Label>
                        <Input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    date: e.target.value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Label>تاريخ الاستحقاق</Label>
                        <Input
                            type="date"
                            value={form.dueDate}
                            onChange={(e) =>
                                setForm((prev) => ({
                                    ...prev,
                                    dueDate: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                    {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-4 gap-2">
                            <Input
                                placeholder="الصنف"
                                value={item.name}
                                onChange={(e) =>
                                    updateItem(item.id, "name", e.target.value)
                                }
                            />

                            <Input
                                type="number"
                                value={item.qty}
                                onChange={(e) =>
                                    updateItem(item.id, "qty", e.target.value)
                                }
                            />

                            <Input
                                type="number"
                                value={item.price}
                                onChange={(e) =>
                                    updateItem(item.id, "price", e.target.value)
                                }
                            />

                            <Button
                                variant="destructive"
                                onClick={() => removeItem(item.id)}
                            >
                                حذف
                            </Button>
                        </div>
                    ))}
                </div>

                <Button variant="outline" onClick={addItem}>
                    إضافة صنف
                </Button>

                <div className="mt-4 text-sm space-y-1">
                    <div>Subtotal: {subtotal}</div>
                    <div>Tax (14%): {tax}</div>
                    <div className="font-bold">Total: {total}</div>
                </div>

                <Button variant="purple" className="w-full mt-4" onClick={handleSubmit}>
                    حفظ الفاتورة <Save />
                </Button>
            </DialogContent>
        </Dialog>
    );
}