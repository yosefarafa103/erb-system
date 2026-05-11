import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

import { IInvoiceItem } from "../_types/Invoices";
import { IProduct } from "../_types/products";
import { InvoiceItem } from "./AddInvoiceDialog";

type Props = {
    items: InvoiceItem[];
    setItems: React.Dispatch<React.SetStateAction<IInvoiceItem[]>>;
    products: IProduct[];
};

export default function InvoiceItems({
    items,
    setItems,
    products,
}: Props) {
    const updateItem = (
        index: number,
        data: Partial<InvoiceItem>
    ) => {
        setItems((prev) => {
            const copy = [...prev];

            const updated: InvoiceItem = {
                ...copy[index],
                ...data,
            };

            updated.total =
                Number(updated.price) * Number(updated.quantity);

            copy[index] = updated;

            return copy;
        });
    };

    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="grid grid-cols-12 gap-3 items-center"
                >
                    {/* Product */}
                    <div className="col-span-4">
                        <select
                            className="w-full h-10 border rounded-md px-2 bg-background"
                            value={item.productId}
                            onChange={(e) => {
                                const selected = products.find(
                                    (p) => p._id === e.target.value
                                );

                                if (selected) {
                                    updateItem(index, {
                                        productId: selected._id,
                                        name: selected.name,
                                        price: selected.price,
                                    });
                                }
                            }}
                        >
                            <option value="">اختر منتج</option>

                            {products.map((product) => (
                                <option
                                    key={product._id}
                                    value={product._id}
                                >
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2">
                        <Input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                                updateItem(index, {
                                    quantity: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    {/* Price */}
                    <div className="col-span-2">
                        <Input
                            type="number"
                            min={0}
                            value={item.price}
                            onChange={(e) =>
                                updateItem(index, {
                                    price: Number(e.target.value),
                                })
                            }
                        />
                    </div>

                    {/* Total */}
                    <div className="col-span-2 font-medium text-sm">
                        {item.total.toFixed(2)}
                    </div>

                    {/* Delete */}
                    <div className="col-span-2 flex justify-center">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(index)}
                        >
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}