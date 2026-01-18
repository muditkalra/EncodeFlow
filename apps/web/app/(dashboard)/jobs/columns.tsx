"use client";

import JobDetails from "@/components/JobDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { jobStatusBadgeColor } from "@/types";
import { getRelativeTime, getTimediff } from "@/utils/datetime";
import type { JobType, OutputConfig, VideoType } from "@repo/types";
import { type JobStatus } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle2, CircleX } from "lucide-react";

type ColDef = JobType & {
    video: VideoType
}

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
            const jobStatusColor = jobStatusBadgeColor[value]
            return (
                <Badge className={cn("border text-neutral-200", jobStatusColor)}>
                    {value}
                </Badge>
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
        cell: ({ getValue }) => {
            const milliseconds = getValue<number | null>();
            if (!milliseconds) return "-";

            const seconds = Math.floor(milliseconds / 1000);
            const minutes = Math.floor(seconds / 60);

            // Format based on duration
            if (minutes > 0) {
                return `${minutes}m ${seconds % 60}s`;
            } else if (seconds > 0) {
                return `${seconds}s`;
            } else {
                return `${milliseconds}ms`;
            }
        }
    },
    {
        accessorKey: "progress",
        header: "Progress %",
        cell: ({ getValue }) => {
            return (
                <div className="">
                    {getValue() as number}
                </div>
            )
        }
    },
    {
        id: "outputFormat",
        header: "Output Format",
        accessorFn: ({ outputConfig }) => JSON.parse(outputConfig as string),
        cell: ({ getValue }) => (getValue() as OutputConfig).format

    },
    {
        id: "outputResolution",
        header: "Output Resolution",
        accessorFn: ({ outputConfig }) => JSON.parse(outputConfig as string),
        cell: ({ getValue }) => (getValue() as OutputConfig).resolution

    },
    {
        id: "includeAudio",
        header: "Include Audio",
        accessorFn: ({ outputConfig }) => JSON.parse(outputConfig as string),
        cell: ({ getValue }) => {
            const value = (getValue() as OutputConfig).includeAudio;
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
            return (
                <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Created At
                    <ArrowUpDown className="ml-2" />
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
                    <JobDetails />
                </Sheet>
            )

        }
    }
]