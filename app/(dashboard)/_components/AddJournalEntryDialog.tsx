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
import { useJournalStore } from "../_stores/useJournalStore";
import { JournalEntry } from "../_types/accounting";

type Line = {
    account: string;
    debit: number;
    credit: number;
};

export default function AddJournalEntryDialog() {
    const [open, setOpen] = useState(false);

    const [form, setForm] = useState({
        date: "",
        description: "",
        reference: "",
    });

    const [lines, setLines] = useState<Line[]>([
        { account: "", debit: 0, credit: 0 },
    ]);

    const addLine = () => {
        setLines([...lines, { account: "", debit: 0, credit: 0 }]);
    };

    const updateLine = (index: number, field: keyof Line, value: any) => {
        const newLines: any[] = [...lines];
        newLines[index][field as keyof Line] = field === "account" ? value : Number(value)
        setLines(newLines);
    };

    const removeLine = (index: number) => {
        setLines(lines.filter((_, i) => i !== index));
    };

    const totalDebit = lines.reduce((sum, l) => sum + l.debit, 0);
    const totalCredit = lines.reduce((sum, l) => sum + l.credit, 0);

    const isBalanced = totalDebit === totalCredit;


    const addEntry = useJournalStore((s) => s.addEntry);

    const handleSubmit = () => {
        if (!isBalanced) return;

        const newEntry: JournalEntry = {
            id: `JE-${Date.now()}`,
            date: form.date,
            description: form.description,
            reference: form.reference,
            status: "posted",
            totalDebit,
            totalCredit,
            lines,
            createdAt: new Date().toISOString(),
        };

        addEntry(newEntry);

        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="purple"> اضف قيد جديد <Plus />  </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>إضافة قيد جديد</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
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
                        <Label>الوصف</Label>
                        <Input
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                        />
                    </>

                    <>
                        <Label>مرجع</Label>
                        <Input
                            value={form.reference}
                            onChange={(e) =>
                                setForm({ ...form, reference: e.target.value })
                            }
                        />
                    </>
                </div>

                <div className="space-y-3 mt-4 max-h-50 w-full overflow-y-scroll">
                    {lines.map((line, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-5 gap-2 items-center"
                        >
                            <Input
                                placeholder="الحساب"
                                value={line.account}
                                onChange={(e) =>
                                    updateLine(i, "account", e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                placeholder="مدين"
                                value={line.debit}
                                onChange={(e) =>
                                    updateLine(i, "debit", e.target.value)
                                }
                            />
                            <Input
                                type="number"
                                placeholder="دائن"
                                value={line.credit}
                                onChange={(e) =>
                                    updateLine(i, "credit", e.target.value)
                                }
                            />

                            <Button
                                variant="destructive"
                                onClick={() => removeLine(i)}
                            >
                                حذف
                            </Button>
                        </div>
                    ))}
                </div>
                <Button
                    variant="outline"
                    className="mt-2"
                    onClick={addLine}
                >
                    إضافة سطر
                </Button>

                <div className="flex justify-between mt-4 text-sm">
                    <span>مدين: {totalDebit}</span>
                    <span>دائن: {totalCredit}</span>
                </div>

                {!isBalanced && (
                    <p className="text-red-500 text-sm">
                        القيد لازم يكون متوازن
                    </p>
                )}

                <Button
                    className="w-full mt-4"
                    onClick={handleSubmit}
                    disabled={!isBalanced}
                >
                    حفظ القيد
                </Button>
            </DialogContent>
        </Dialog>
    );
}