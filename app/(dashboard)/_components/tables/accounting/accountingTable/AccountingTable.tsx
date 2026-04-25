"use client"
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { columns } from "./columns"
import { accountingAlerts } from '@/app/(dashboard)/_components/tables/accounting/accountingTable/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
const AccountingTable = () => {
    const table = useReactTable({
        data: accountingAlerts,
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
                    <TableRow key={row.id}>
                        {/* @ts-ignore */}
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                )) :
                    null
                }
            </TableBody>
        </Table>
    )
}

export default AccountingTable
