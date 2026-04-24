"use client"
import { flexRender, getCoreRowModel, Header, Row, useReactTable } from '@tanstack/react-table';
import { columns } from "./columns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { journalEntries } from '@/app/(dashboard)/constants/accounting';
import { Separator } from '@/components/ui/separator';
import { JournalEntry, JournalEntryLine } from '@/app/(dashboard)/_types/accounting';
import { useState } from 'react';
import { useJournalStore } from '@/app/(dashboard)/_stores/useJournalStore';

const DataTable = () => {
    const entries = useJournalStore((s) => s.entries);

    const table = useReactTable({
        data: entries,
        columns,
        getCoreRowModel: getCoreRowModel()
    });
    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="bg-accent rounded-lg" >
                        {headerGroup.headers.map((header, i) => (
                            <TableHead className='text-right' key={header.id}>
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
                {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
                    <DataTable.Cell key={row.id} row={row} />

                )) :
                    null
                }
            </TableBody>
        </Table>
    )
}

export default DataTable


DataTable.Cell = ({ row }: { row: Row<JournalEntry> }) => {
    const [isOpen, setIsOpen] = useState(false);

    const lines = row.original.lines;

    return (
        <>
            <TableRow
                onClick={() => setIsOpen((prev) => !prev)}
                className="cursor-pointer"
            >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
            </TableRow>
            <>

                {isOpen &&
                    lines.map((line) => (
                        <TableRow
                            key={line.account}
                            className="bg-muted/50"
                        >
                            <TableCell colSpan={columns.length}>
                                <div className="grid grid-cols-5 gap-4 px-4 py-2 text-sm w-full">
                                    <span>{line.account}</span>
                                    <span>{line.debit} دائن</span>
                                    <span>{line.credit} مدين</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
            </>
        </>
    );
};