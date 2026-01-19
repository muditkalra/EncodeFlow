"use client";

import JobDetails from "@/components/JobDetails";
import JobStatusBadge from "@/components/JobStatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ColumnType } from "@/types";
import { calculateProcessingTime, getRelativeTime, getTimediff } from "@/utils";
import type { OutputConfigType } from "@repo/types";
import { type JobStatus } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, CircleX } from "lucide-react";

type ColDef = ColumnType;

export const columns: ColumnDef<ColDef>[] = [
    {
        id: "Select",
        header: ({ table }) => (
            <Checkbox
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => <Checkbox onCheckedChange={(value) => row.toggleSelected(!!value)} checked={row.getIsSelected()} />,
        size: 40,
        enableResizing: false
    },
    {
        id: "filename",
        accessorKey: "video.name",
        header: "Filename",
    },
    {
        id: "filetype",
        accessorKey: "video.fileType",
        header: "Filetype",
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.getValue("status") as JobStatus;
            return (
                <JobStatusBadge value={value} />
            )
        }
    },
    {
        id: "processing_time",
        header: ({ column }) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Processing Time
                    <ArrowUpDown className="ml-2" />
                </Button>
            )
        },
        accessorFn: (row) => {
            if (!row.finishedAt || !row.startedAt) {
                return null;
            }
            return getTimediff(row.finishedAt, row.startedAt);
        },
        cell: ({ row }) => {
            const startTime = row.original.startedAt;
            const endTime = row.original.finishedAt;
            const time = calculateProcessingTime(endTime, startTime);
            return time;
        }
    },
    {
        accessorKey: "progress",
        header: "Progress %",
    },
    {
        id: "outputFormat",
        header: "Output Format",
        accessorFn: ({ outputConfig }) => JSON.parse(outputConfig as string),
        cell: ({ getValue }) => (getValue() as OutputConfigType).format

    },
    {
        id: "outputResolution",
        header: "Output Resolution",
        accessorFn: ({ outputConfig }) => JSON.parse(outputConfig as string),
        cell: ({ getValue }) => (getValue() as OutputConfigType).resolution

    },
    {
        id: "includeAudio",
        header: "Include Audio",
        accessorFn: ({ outputConfig }) => JSON.parse(outputConfig as string),
        cell: ({ getValue }) => {
            const value = (getValue() as OutputConfigType).includeAudio;
            return (
                value ?
                    <CheckCircle2 className="size-5 text-green-500/50" />
                    :
                    <CircleX className="size-5 text-red-500/50" />
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            // column.sort
            return (
                <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Created At
                    {column.getIsSorted() === "asc" ?
                        <ArrowUp className="ml-2" />
                        :
                        <ArrowDown className="ml-2" />
                    }
                </Button>
            )
        },
        cell: ({ getValue }) => {
            return (
                <div title={getValue<Date>().toLocaleString("en-IN")}>
                    {getRelativeTime(getValue<Date>())}
                </div>
            )
        },
    },
    {
        accessorKey: "errorMessage",
        header: "Error Message",
        cell: ({ getValue }) => (getValue() || "-"),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const rowData = row.original;
            return (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"}>
                            More details
                        </Button>
                    </SheetTrigger>
                    <JobDetails job={rowData} />
                </Sheet>
            )

        }
    }
]