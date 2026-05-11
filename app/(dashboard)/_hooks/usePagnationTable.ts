"use client";

import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

type Props<TData> = {
    data: TData[];

    columns: ColumnDef<TData>[];

    pageSize?: number;
};

export function usePaginationTable<
    TData
>({
    data,
    columns,
    pageSize = 10,
}: Props<TData>) {
    const [
        pagination,
        setPagination,
    ] = useState<PaginationState>({
        pageIndex: 0,
        pageSize,
    });

    const table = useReactTable({
        data,

        columns,

        state: {
            pagination,
        },

        onPaginationChange:
            setPagination,

        getCoreRowModel:
            getCoreRowModel(),

        getPaginationRowModel:
            getPaginationRowModel(),
    });

    return {
        ...table,

        pagination,

        setPagination,

        pageIndex:
            pagination.pageIndex,

        pageSize:
            pagination.pageSize,

        totalPages:
            table.getPageCount(),

        canNextPage:
            table.getCanNextPage(),

        canPreviousPage:
            table.getCanPreviousPage(),

        nextPage:
            table.nextPage,

        previousPage:
            table.previousPage,
    };
}