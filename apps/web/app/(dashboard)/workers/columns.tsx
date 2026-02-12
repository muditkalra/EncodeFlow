"use client";

import StatusBadge from "@/components/StatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatToPercent } from "@/utils";
import type { WorkerData, WorkerStatus } from "@repo/types";
import { ColumnDef } from "@tanstack/react-table";


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
        cell: ({ getValue, row }) => {
            const workerId = getValue() as string;
            // const rowData = row.original;
            return (
                // <Sheet>
                //     <SheetTrigger>
                //         <span className="underline cursor-pointer">
                //             {fileName}
                //         </span>
                //     </SheetTrigger>
                //     <JobDetails job={rowData} />
                // </Sheet>
                <span className="underline cursor-pointer">
                    {workerId}
                </span>
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
        header: "Current-JobId",
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
        header: "HeartBeatAt",
        cell: ({ getValue }) => {
            const time = Number(getValue<number>());
            return (
                <div title={new Date(time).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "long" })}>
                    {new Date(time).toLocaleTimeString()}
                </div>
            )
        },
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const rowData = row.original;
    //         return (
    //             <div className="flex gap-2">
    //                 <DownloadButton variant={"secondary"} buttonType={'output'} disabled={rowData.status !== "COMPLETED"} url={rowData.outputUrl} size={"sm"} className={cn(rowData.status !== "COMPLETED" && "invisible")}>
    //                     Output
    //                 </DownloadButton>
    //                 <Sheet>
    //                     <SheetTrigger asChild>
    //                         <Button variant={"ghost"}>
    //                             More details
    //                         </Button>
    //                     </SheetTrigger>
    //                     <JobDetails job={rowData} />
    //                 </Sheet>
    //             </div>
    //         )
    //     }
    // }
]