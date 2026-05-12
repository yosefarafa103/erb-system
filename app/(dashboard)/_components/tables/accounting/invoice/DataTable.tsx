"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
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
import { IInvoice } from "@/app/(dashboard)/_types/Invoices";
import { usePaginationTable } from "@/app/(dashboard)/_hooks/usePagnationTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TableSkeleton from "@/components/TableSkeleton";
interface Props {
    data: IInvoice[],
}
export default function InvoicesTable({ data, }: Props) {
    const { getHeaderGroups, getRowModel, getState, getPageCount, getCanPreviousPage, previousPage, nextPage, getCanNextPage } = usePaginationTable({
        data,
        columns,
        pageSize: 5
    })
    return (
        <>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        {getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead key={header.id} className="text-right">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {getRowModel().rows.map((row) => (
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
                        ))}
                    </TableBody>
                </Table>
            </div>
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

        </>

    );
}