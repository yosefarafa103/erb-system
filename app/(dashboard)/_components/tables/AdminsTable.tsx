"use client";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel
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
import { useMemo, useState } from "react";
import { selectFilteredUsers } from "../../helpers";
import { useTableFilters } from "../../stores/useTableStore";
import { useGlobalSearch } from "../../stores/useGlobalSearch";
import { GetMeReponseType, User } from "../../_types/users";
import { Button } from "@/components/ui/button";
import { GreaterThanCircleFreeIcons, LessThanCircleFreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
export default function UsersTable({ users }: { users: GetMeReponseType[] }) {
    const { search, role, status } = useTableFilters();
    const { searchMap } = useGlobalSearch();
    const filteredData = useMemo(
        () => selectFilteredUsers(users, searchMap?.users || search, role, status),
        [users, searchMap?.users, role, status, search]
    );

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 3
    });
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        }
    });
    const getUsersWithRoleByTenant = (users: GetMeReponseType[], tenantId: string) => {
        return users.map((user) => {
            const tenant = user.tenants.find(
                (t: any) => t.tenantId === tenantId
            );

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: tenant?.role || "user",
                status: tenant?.status || "inactive",
            };
        });
    };
    console.log(getUsersWithRoleByTenant(users, '69e54065c3b31b260d4a1d39'));

    return (
        <div className="rounded-xl border bg-background">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, i) => (
                                <TableHead className="text-right bg-accent" key={header.id}>
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
            {
                !table.getRowModel().rows.length ?
                    <TableRow className="text-center flex justify-center w-full">
                        <TableCell className="text-center">
                            لم يتم العثور علي نتيجة بحثك
                        </TableCell>
                    </TableRow>
                    : null}
            <div className="flex gap-2 items-center m-3 justify-end">
                <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    variant="outline" size="icon-lg">
                    <HugeiconsIcon
                        size={22} icon={GreaterThanCircleFreeIcons} />
                </Button>
                <Button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    variant="outline" size="icon-lg">
                    <HugeiconsIcon size={22} icon={LessThanCircleFreeIcons} />
                </Button>
            </div>
        </div>
    );
}


