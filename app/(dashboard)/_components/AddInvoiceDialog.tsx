"use client";

import { useState } from "react";
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
import { Plus } from "lucide-react";

type Item = {
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
        { name: "", qty: 1, price: 0 },
    ]);

    const addItem = () => {
        setItems([...items, { name: "", qty: 1, price: 0 }]);
    };

    const updateItem = (index: number, field: keyof Item, value: any) => {
        const newItems = [...items];
        // @ts-ignore
        newItems[index][field] = field === "name" ? value : Number(value);
        setItems(newItems);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const subtotal = items.reduce(
        (sum, i) => sum + i.qty * i.price,
        0
    );

    const tax = subtotal * 0.14;
    const total = subtotal + tax;

    const handleSubmit = () => {
        const invoice = {
            id: `INV-${Date.now()}`,
            ...form,
            items,
            subtotal,
            tax,
            total,
            status: "draft",
        };

        console.log(invoice);

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"lg"} variant="purple"> إنشاء فاتورة جديد <Plus /> </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>إنشاء فاتورة جديدة</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <>
                        <Label>العميل</Label>
                        <Input
                            value={form.customer}
                            onChange={(e) =>
                                setForm({ ...form, customer: e.target.value })
                            }
                        />
                    </>
                    <>
                        <Label>التاريخ</Label>
                        <Input
                            type="date"
                            value={form.date}
                            onChange={(e) =>
                                setForm({ ...form, date: e.target.value })
                            }
                        />
                    </>

                    <>
                        <Label>تاريخ الاستحقاق</Label>
                        <Input
                            type="date"
                            value={form.dueDate}
                            onChange={(e) =>
                                setForm({ ...form, dueDate: e.target.value })
                            }
                        />
                    </>
                </div>
                <div className="space-y-2 mt-4">
                    {items.map((item, i) => (
                        <div key={i} className="grid grid-cols-4 gap-2">
                            <Input
                                placeholder="الصنف"
                                value={item.name}
                                onChange={(e) =>
                                    updateItem(i, "name", e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                placeholder="الكمية"
                                value={item.qty}
                                onChange={(e) =>
                                    updateItem(i, "qty", e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                placeholder="السعر"
                                value={item.price}
                                onChange={(e) =>
                                    updateItem(i, "price", e.target.value)
                                }
                            />
                            <Button
                                variant="destructive"
                                onClick={() => removeItem(i)}
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
                <Button className="w-full mt-4" onClick={handleSubmit}>
                    حفظ الفاتورة
                </Button>
            </DialogContent>
        </Dialog>
    );
}