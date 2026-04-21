"use client"
import { flexRender, getCoreRowModel, Header, Row, useReactTable } from '@tanstack/react-table';
import { columns } from "./columns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { journalEntries } from '@/app/(dashboard)/constants/accounting';
import { Separator } from '@/components/ui/separator';
import { JournalEntry, JournalEntryLine } from '@/app/(dashboard)/_types/accounting';
import { useState } from 'react';

const DataTable = () => {
    const table = useReactTable({
        data: journalEntries,
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



DataTable.Cell = ({ row, }: { row: Row<JournalEntry>, }) => {
    const [isShowSubCell, setIsShowSubCell] = useState(false)
    console.log();
    const lines: JournalEntryLine[] = row.getValue("lines")
    return <>

        <TableRow onClick={() => setIsShowSubCell(!isShowSubCell)} key={row.id}>
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                    )}
                </TableCell>
            ))}
        </TableRow>
        {isShowSubCell &&
            <>
                {lines.map(() => (
                    <TableRow className='bg-accent mt-3 inline-flex w-full' onClick={() => setIsShowSubCell(!isShowSubCell)} key={row.id}>
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
            </>
        }
    </>
}