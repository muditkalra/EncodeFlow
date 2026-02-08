import { Activity, Cpu, LucideIcon, MemoryStick, Pause, Server } from 'lucide-react';
import WorkerCard from './WorkerCard';

interface CardItem {
    title: string;
    dataKey: string; // change to pre-defined keys;
    Icon: LucideIcon;
    footer: string;
    classes: string;
}

const cards: CardItem[] = [
    {
        title: "Total Workers",
        dataKey: "total",
        Icon: Server,
        footer: "Currently active",
        classes: "size-4",
    },
    {
        title: "Running worker",
        dataKey: "running",
        Icon: Activity,
        footer: "Worker processing jobs",
        classes: "size-4 text-green-700",
    },
    {
        title: "Idle workers",
        dataKey: "idle",
        Icon: Pause,
        footer: "Available for new jobs",
        classes: "size-4 text-amber-700",
    },
    {
        title: "Avg CPU Usage (%)",
        dataKey: "cpu",
        Icon: Cpu,
        footer: "Across all active workers",
        classes: "size-4 text-blue-700",
    },
    {
        title: "Avg Memory Usage",
        dataKey: "mem",
        Icon: MemoryStick,
        footer: "Used vs Allocated Memory",
        classes: "size-4 text-red-700",
    }
]


const data = {
    total: 5,
    running: 2,
    idle: 3,
    cpu: 28,
    mem: 12
}


export default function WorkerCards() {
    return (
        <div className="space-y-1.5">
            {/* <div className="flex justify-end gap-2 items-center">
                <div className="text-muted-foreground text-xs">
                    last updated: {new Date(dataUpdatedAt).toLocaleTimeString("en-IN")}
                </div>
                <RotateCw className={cn('size-3.5 text-accent-foreground', fetching ? "animate-spin" : "")} onClick={handleRefetching} />
            </div> */}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-5">
                {cards.map(({ Icon, footer, title, classes, dataKey }, idx) =>
                    // <div className={cn(idx % 2 ? "col-span-2" : "")}>
                    <WorkerCard Icon={Icon} classes={classes} footer={footer} title={title} key={idx} value={data["running"]} />
                    // </div>
                )}
            </div>
        </div>
    )
}
