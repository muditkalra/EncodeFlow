import { timeRanges, type TimeRanges } from '@repo/types';
import { useState } from 'react';
import TimeRangeToggle from '../TimeRangeToggle';
import CpuChart from './CpuChart';
import MemChart from './MemChart';

export default function MetricTab({ wid }: { wid: string }) {
    const [range, setRange] = useState<TimeRanges>("15m");

    return (
        <div className="flex flex-col gap-2">
            <div className="place-self-end">
                <TimeRangeToggle timeRanges={timeRanges} setRange={setRange} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                <div className="h-4/5">
                    <CpuChart wid={wid} range={range} />
                </div>
                <div className="h-4/5">
                    <MemChart wid={wid} range={range} />
                </div>
            </div>
        </div>
    )
}
