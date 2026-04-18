"use client";
import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { columns } from "./columns";
import { adminDataTable as data } from "./data";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { selectFilteredUsers } from "../../helpers";
import { useTableFilters } from "../../stores/useTableStore";
export default function UsersTable() {
    const { search, role, status } = useTableFilters();
    const filteredData = useMemo(
        () => selectFilteredUsers(data, search, role, status),
        [data, search, role, status]
    );
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
    return (
        <div className="rounded-xl border bg-background">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, i) => (
                                <TableHead className="text-right bg-gray-100" key={header.id}>
                                    {i === 0 ? <>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </> :
                                        <div className="flex items-center gap-4 text-sm">
                                            <Separator orientation="vertical" />
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    }
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
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
    );
}


