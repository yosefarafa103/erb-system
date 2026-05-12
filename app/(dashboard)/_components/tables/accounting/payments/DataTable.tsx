"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";
import { usePayments } from "@/app/(dashboard)/_hooks/usePayments";
import { usePaginationTable } from "@/app/(dashboard)/_hooks/usePagnationTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TableSkeleton from "@/components/TableSkeleton";

export default function PaymentsTable() {
    const tenantId = localStorage.getItem("currentTenent")
    const { data, isLoading } = usePayments(tenantId);
    const { getHeaderGroups, getRowModel, getState, getPageCount, getCanPreviousPage, previousPage, nextPage, getCanNextPage } = usePaginationTable({ data: data || [], columns, pageSize: 5 })
    return (
        <div className="rounded-lg border bg-background">
            {isLoading ? <TableSkeleton columns={5} rows={7} /> :
                <Table>
                    <TableHeader>
                        {getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-right">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {getRowModel().rows.length ? (
                            getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
                                    لا يوجد بيانات
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }
            <div className="flex items-center justify-between p-2 mt-2">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                    صفحة
                    {getState()
                        .pagination
                        .pageIndex + 1}
                    من
                    {getPageCount()}
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            previousPage()
                        }
                        disabled={
                            !getCanPreviousPage()
                        }
                    >
                        <ArrowRight />
                        السابق
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            nextPage()
                        }
                        disabled={
                            !getCanNextPage()
                        }
                    >
                        التالي
                        <ArrowLeft />

                    </Button>
                </div>
            </div>
        </div>
    );
}