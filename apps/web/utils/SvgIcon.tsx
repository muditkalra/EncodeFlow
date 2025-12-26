import { cn } from "@/lib/utils";

export function XIcon({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className={cn("size-6", className)} fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <g strokeWidth="1.25">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </g>
        </svg>
    )
}