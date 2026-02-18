"use client";

import DownloadButton from "@/components/DownloadButton";
import JobDetails from "@/components/JobDetails";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { JobsColumnType } from "@/types";
import { calculateProcessingTime, getRelativeTime, getTimediff } from "@/utils";
import type { JobStatus, OutputConfigType } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle, CircleMinus } from "lucide-react";


export const columns: ColumnDef<JobsColumnType>[] = [
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
        size: 25,
        enableResizing: false,
        enableHiding: false
    },
    {
        id: "filename",
        accessorKey: "video.name",
        header: "Filename",
        cell: ({ getValue, row }) => {
            const fileName = getValue() as string;
            const rowData = row.original;
            return (
                <Sheet>
                    <SheetTrigger>
                        <span className="underline cursor-pointer">
                            {fileName}
                        </span>
                    </SheetTrigger>
                    <JobDetails job={rowData} />
                </Sheet>
            )
        }
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
            const value = (row.getValue<string>("status").toLowerCase()) as JobStatus;
            return (
                <StatusBadge value={value} />
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
                    <CheckCircle className="size-4 text-green-700" />
                    :
                    <CircleMinus className="size-4 text-red-700" />
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
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
            const time = getValue<Date>();
            return (
                <div title={new Date(time).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}>
                    {getRelativeTime(time)}
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
                <div className="flex gap-2">
                    <DownloadButton variant={"secondary"} buttonType={'output'} disabled={rowData.status !== "COMPLETED"} url={rowData.outputUrl} size={"sm"} className={cn(rowData.status !== "COMPLETED" && "invisible")}>
                        Output
                    </DownloadButton>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant={"ghost"}>
                                More details
                            </Button>
                        </SheetTrigger>
                        <JobDetails job={rowData} />
                    </Sheet>
                </div>
            )

        }
    }
]