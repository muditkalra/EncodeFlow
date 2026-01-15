"use client";

import { ColumnDef } from "@tanstack/react-table"
import type { JobType, VideoType } from "@repo/types"
import { Badge } from "@/components/ui/badge";
import { jobStatusBadgeColor } from "@/types";
import { type JobStatus } from "@repo/types"
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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
        header: "Processing Time",
        accessorFn: (row) => {
            if (row.finishedAt && row.startedAt) {
                return new Date(row.finishedAt).getTime() - new Date(row.startedAt).getTime();
            }
            return null;
        },
        cell: ({ getValue }) => {
            const milliseconds = getValue() as number | null;

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
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => ((getValue() as Date).toLocaleString("en-IN"))
    },
    {
        accessorKey: "errorMessage",
        header: "Error",
        cell: ({ getValue }) => (getValue() || "-"),
    },
    // {
    //     accessorKey: "errorMessag",
    //     header: "Error",
    //     cell: ({ getValue }) => (getValue() || "-")
    // },

]