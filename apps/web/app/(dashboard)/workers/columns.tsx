"use client";

import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useRelativeTime from "@/hooks/useRelativeTime";
import { formatToPercent } from "@/utils";
import type { WorkerData, WorkerStatus } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";


export const columns: ColumnDef<WorkerData>[] = [
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
        header: "WorkerId",
        accessorKey: "workerId",
        cell: ({ getValue }) => {
            const workerId = getValue() as string;
            return (
                <Link href={`/workers/${workerId}`} className="hover:underline">
                    {workerId}
                </Link>
            )
        }
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const value = (getValue<string>().toLowerCase()) as Lowercase<WorkerStatus>;
            return (
                <StatusBadge value={value} />
            )
        }
    },
    {
        id: "currentJobId",
        accessorKey: "currentJobId",
        header: "JobId",
        cell: ({ getValue }) => (getValue() || "-")
    },
    {
        id: "cpu",
        accessorKey: "cpu",
        header: "CPU(%)",
        cell: ({ getValue }) => {
            const value = getValue() as number;
            const formattedValue = formatToPercent(value);
            return (
                <div className="">
                    {formattedValue}%
                </div>
            )
        }
    },
    {
        id: "mem",
        accessorFn: ({ memoryLimit, memoryUsed }) => {
            if (!memoryLimit || !memoryUsed) {
                return null;
            }
            return Number(memoryUsed) / Number(memoryLimit);
        },
        header: "Memory (%)",
        cell: ({ getValue }) => {
            const value = getValue<number>();
            const formattedValue = formatToPercent(value);
            return (
                <div className="">
                    {formattedValue}%
                </div>
            )
        }
    },
    {
        accessorKey: "heartBeatAt",
        header: "Heartbeat At",
        cell: ({ getValue }) => {
            const value = Number(getValue<number>());
            const relativeTime = useRelativeTime(Number(value));
            return (
                <div title={new Date(value).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "long" })}>
                    {relativeTime}
                </div>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const workerId = row.original.workerId;
            return (
                <Button variant={"link"} asChild>
                    <Link href={`/workers/${workerId}`} className="">
                        More details 
                    </Link>
                </Button>

            )
        }
    }
]