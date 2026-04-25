"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";

export default function WarehousesModule() {
    const [warehouses, setWarehouses] = useState([
        { id: 1, name: "المخزن الرئيسي", location: "القاهرة", capacity: 1000 },
        { id: 2, name: "مخزن فرعي", location: "الجيزة", capacity: 500 },
    ]);

    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ name: "", location: "", capacity: "" });

    const filtered = warehouses.filter(
        (w) =>
            w.name.toLowerCase().includes(search.toLowerCase()) ||
            w.location.toLowerCase().includes(search.toLowerCase())
    );

    const addWarehouse = () => {
        setWarehouses([
            ...warehouses,
            {
                id: Date.now(),
                name: form.name,
                location: form.location,
                capacity: Number(form.capacity),
            },
        ]);
        setForm({ name: "", location: "", capacity: "" });
    };

    return (
        <div className="p-2 space-y-6" dir="rtl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">المخازن</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'purple'} className="flex gap-2">
                            إضافة مخزن
                            <Plus size={16} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>مخزن جديد</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="اسم المخزن"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <Input
                                placeholder="الموقع"
                                value={form.location}
                                onChange={(e) => setForm({ ...form, location: e.target.value })}
                            />
                            <Input
                                placeholder="السعة"
                                type="number"
                                value={form.capacity}
                                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                            />
                            <Button onClick={addWarehouse} className="w-full">حفظ</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <Search size={16} />
                        <Input
                            placeholder="بحث عن المخازن..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">اسم المخزن</TableHead>
                                <TableHead className="text-right">الموقع</TableHead>
                                <TableHead className="text-right">السعة</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((w) => (
                                <TableRow key={w.id}>
                                    <TableCell>{w.name}</TableCell>
                                    <TableCell>{w.location}</TableCell>
                                    <TableCell>{w.capacity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}