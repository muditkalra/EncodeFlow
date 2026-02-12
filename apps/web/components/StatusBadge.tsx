import { cn } from '@/lib/utils';
import { badgeColors, BadgeKeys } from '@/types';
import { Badge } from './ui/badge';

export default function StatusBadge({ value }: { value: BadgeKeys }) {
    const statusColor = badgeColors[value];
    return (
        <Badge className={cn(statusColor, "capitalize tracking-wide")}>
            {value}
        </Badge>
    )
}
