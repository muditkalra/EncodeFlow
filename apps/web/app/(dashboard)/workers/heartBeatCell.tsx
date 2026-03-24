import useRelativeTime from '@/hooks/useRelativeTime';

export default function HeartBeatCell({ value }: { value: number }) {
    const relativeTime = useRelativeTime(Number(value));
    return (
        <div title={new Date(value).toLocaleString("en-IN", { dateStyle: "long", timeStyle: "long" })}>
            {relativeTime}
        </div>
    )
}
