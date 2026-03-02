import { Dispatch, SetStateAction } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

interface TimeRangesProps<T extends string> {
    timeRanges: T[];
    setRange: Dispatch<SetStateAction<T>>;
}

export default function TimeRangeToggle<T extends string>({ timeRanges, setRange }: TimeRangesProps<T>) {

    return (
        <ToggleGroup variant="outline" type="single" defaultValue={timeRanges[0]} size={"sm"}>
            {
                timeRanges.map((r) => (
                    <ToggleGroupItem value={r} aria-label={`Tog ${r}`} key={r} onClick={() => setRange(r)}>
                        {r}
                    </ToggleGroupItem>
                ))
            }
        </ToggleGroup>
    )
}
