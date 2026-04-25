"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search } from "lucide-react";

export default function ProductsModule() {
    const [products, setProducts] = useState([
        { id: 1, name: "Product A", sku: "P001", price: 100, stock: 20 },
        { id: 2, name: "Product B", sku: "P002", price: 150, stock: 10 },
    ]);
    const [search, setSearch] = useState("");
    const [form, setForm] = useState({ name: "", sku: "", price: "", stock: "" });

    const filtered = products.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase())
    );

    const addProduct = () => {
        setProducts([
            ...products,
            {
                id: Date.now(),
                name: form.name,
                sku: form.sku,
                price: Number(form.price),
                stock: Number(form.stock),
            },
        ]);
        setForm({ name: "", sku: "", price: "", stock: "" });
    };

    return (
        <div className="space-y-2 p-2">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">المنتجات</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='purple' className="flex gap-2">
                            اضف منتج
                            <Plus size={16} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Product</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                            <Input
                                placeholder="SKU"
                                value={form.sku}
                                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                            />
                            <Input
                                placeholder="Price"
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                            />
                            <Input
                                placeholder="Stock"
                                type="number"
                                value={form.stock}
                                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                            />
                            <Button onClick={addProduct} className="w-full">Save</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <Search size={16} />
                        <Input
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}