"use client";

import { DataTablePagination } from "@/components/DataTablePagination";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useRelativeTime from "@/hooks/useRelativeTime";
import { cn } from "@/lib/utils";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { ChevronDown, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    loading: boolean,
    initialColumnVisibility?: VisibilityState
    showPagination?: boolean
    toolBar?: {
        refetch?: {
            fn?: () => void,
            lastUpdatedAt?: number,
        },
        search?: {
            field: string;
            placeholder: string
        },
        columnVisibilty?: boolean
    }
}


export function DataTable<TData, TValue>({ columns, data, loading, initialColumnVisibility, toolBar, showPagination }: DataTableProps<TData, TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({})
    const [fetching, setFetching] = useState<boolean>(false);

    data = useMemo(() => (
        loading ? Array(15).fill({}) : data),
        [loading, data]
    );
    columns = useMemo(
        () =>
            loading
                ? columns.map((column) => ({
                    ...column,
                    cell: () => (
                        <Skeleton className="h-5 w-4/5 rounded-sm" />
                    ),
                }))
                : columns,
        [loading]
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        initialState: {
            columnVisibility: initialColumnVisibility
        },
        state: {
            columnFilters,
            sorting,
            rowSelection
        },
    });

    const lasttime = useRelativeTime(toolBar?.refetch?.lastUpdatedAt, 1000 * 5);

    const handleClick = () => {
        if (!toolBar?.refetch?.fn) return;
        setFetching(true);
        toolBar.refetch.fn();
        setTimeout(() => setFetching(false), 1500);
    };

    const showToolbar = toolBar?.refetch || toolBar?.search || toolBar?.columnVisibilty;

    return (
        <div className="flex flex-col gap-2.5 mb-5">
            {showToolbar &&
                <div className="flex justify-end gap-3 items-center">
                    {toolBar.refetch &&
                        <div className="text-xs">
                            <span className="text-muted-foreground">Last updated</span>  {lasttime}
                        </div>
                    }
                    {toolBar?.search && <Input
                        placeholder={toolBar.search.placeholder || "Search Filename"}
                        value={(table.getColumn(toolBar.search.field)?.getFilterValue() as string) ?? ""}
                        onChange={(event) => table.getColumn(toolBar?.search?.field || "filename")?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />}
                    {toolBar?.columnVisibilty &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild title="select columns">
                                <Button variant="outline" className="">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                disabled={!column.getCanHide()}
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    {toolBar?.refetch?.fn &&
                        <Button size={"icon"} variant={"outline"} onClick={handleClick} title="refresh">
                            <RefreshCw className={cn(!fetching ? "" : "animate-spin")} />
                        </Button>
                    }
                </div>}
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="bg-muted">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} style={{ width: header.getSize(), position: 'relative' }}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="h-15"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="">
                                        No Jobs yet.
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {showPagination && <DataTablePagination table={table} />}
            </div>
        </div>
    )
}
