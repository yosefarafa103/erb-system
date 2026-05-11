"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
    CheckCircle2,
    Clock3,
    MoreHorizontal,
    Trash,
    Verified,
    XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IInvoice } from "@/app/(dashboard)/_types/Invoices";
import { updateInvoiceStatusAction } from "@/app/(dashboard)/_actions/updateInvoiceStatus";
import { showToast } from "@/helpers/toast";
import AddPaymentDialog from "../../../AddPaymentDialog";
import LoadingDropdown from "@/components/LoadingDropdown";
import { useState, useTransition } from "react";

export const columns: ColumnDef<IInvoice>[] = [
    {
        accessorKey: "_id",
        header: "رقم الفاتورة",

        cell: ({ row }) => {
            const id = row.getValue("_id") as string;

            return (
                <span className="font-mono text-xs font-medium text-purple-600">
                    #{id.slice(-6).toUpperCase()}
                </span>
            );
        },
    },

    {
        accessorKey: "customerId",
        header: "العميل",

        cell: ({ row }) => {
            const customer = row.original.customerId as any;

            return (
                <span className="font-medium text-foreground">
                    {typeof customer === "object"
                        ? customer.name
                        : "عميل غير معروف"}
                </span>
            );
        },
    },

    {
        accessorKey: "createdAt",
        header: "تاريخ الإنشاء",

        cell: ({ row }) => {
            const date = row.getValue("createdAt") as string;

            if (!date) return "---";

            return (
                <span className="text-muted-foreground text-sm">
                    {format(new Date(date), "dd/MM/yyyy")}
                </span>
            );
        },
    },

    {
        accessorKey: "total",
        header: "الإجمالي",

        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("total"));

            const formatted = new Intl.NumberFormat("ar-EG", {
                style: "currency",
                currency: "EGP",
            }).format(amount);

            return (
                <span className="font-bold text-foreground">
                    {formatted}
                </span>
            );
        },
    },

    {
        accessorKey: "status",
        header: "الحالة",

        cell: ({ row }) => {
            const invoice = row.original;

            const statusMap: Record<
                string,
                {
                    label: string;
                    className: string;
                }
            > = {
                draft: {
                    label: "مسودة",
                    className:
                        "bg-gray-100 text-gray-700 border-gray-200",
                },

                confirmed: {
                    label: "مؤكدة",
                    className:
                        "bg-blue-100 text-blue-700 border-blue-200",
                },

                partial: {
                    label: "دفع جزئي",
                    className:
                        "bg-yellow-100 text-yellow-700 border-yellow-200",
                },

                paid: {
                    label: "مدفوعة",
                    className:
                        "bg-green-100 text-green-700 border-green-200",
                },

                cancelled: {
                    label: "ملغاة",
                    className:
                        "bg-red-100 text-red-700 border-red-200",
                },
            };

            const config =
                statusMap[invoice.status] ||
                statusMap.draft;

            const isDisabled =
                invoice.status !== "draft";

            const handleStatusChange = async (
            ) => {
                try {
                    await updateInvoiceStatusAction(
                        invoice._id,
                    );
                    showToast("success", "تم تحديث حالة الفاتورة بنجاح", "", "rtl")

                } catch (error) {
                    console.log(error);
                    showToast("error", "فشل تعديل حالة الفاتورة", "", "rtl")
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Badge className={config.className}>
                        {config.label}
                    </Badge>


                </div>
            );
        },
    },
    {
        id: "actions",

        header: "إجراءات",

        cell: ({ row }) => {
            const invoice = row.original;
            const [open, setOpen] =
                useState(false);
            const [
                isPending,
                startTransition,
            ] = useTransition();
            const isDraft =
                invoice.status === "draft";

            const isConfirmed =
                invoice.status ===
                "confirmed";

            const customerId =
                typeof invoice.customerId ===
                    "object"
                    ? invoice.customerId._id
                    : invoice.customerId;

            const handleConfirm =
                () => {
                    startTransition(
                        async () => {
                            try {
                                await updateInvoiceStatusAction(
                                    invoice._id
                                );
                                setOpen(false);
                            } catch (error) {
                                console.log(
                                    error
                                );
                            }
                        }
                    );
                };

            const handleCancel =
                () => {
                    startTransition(
                        async () => {
                            try {
                                await updateInvoiceStatusAction(
                                    invoice._id
                                );

                                setOpen(false);
                            } catch (error) {
                                console.log(
                                    error
                                );
                            }
                        }
                    );
                };

            return (
                <div className="flex justify-start">
                    <LoadingDropdown
                        open={open}
                        onOpenChange={(
                            value
                        ) => {
                            // يمنع قفل الـ dropdown أثناء الـ mutation
                            if (
                                isPending
                            )
                                return;

                            setOpen(value);
                        }}
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                disabled={
                                    isPending
                                }
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        }
                        content={
                            <div className="flex flex-col gap-1">
                                {/* confirm invoice */}
                                <Button
                                    variant="outline"
                                    disabled={
                                        !isDraft ||
                                        isPending
                                    }
                                    className="justify-between"
                                    onClick={
                                        handleConfirm
                                    }
                                >
                                    {isPending
                                        ? "جاري التنفيذ..."
                                        : "تأكيد الفاتورة"}

                                    <Verified
                                        size={18}
                                    />
                                </Button>

                                {/* add payment */}
                                <AddPaymentDialog
                                    invoiceId={
                                        invoice._id
                                    }
                                    customerId={
                                        customerId
                                    }
                                    totalAmount={
                                        invoice.total
                                    }
                                    disabled={
                                        !isConfirmed ||
                                        isPending
                                    }
                                />

                            </div>
                        }
                    />
                </div>
            );
        },
    }
];