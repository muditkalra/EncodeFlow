"use client";

import { timeRanges, type TimeRanges } from '@repo/types'
import TimeRangeToggle from '../TimeRangeToggle'
import CpuChart from './CpuChart'
import MemChart from './MemChart'
import { useState } from 'react'


export default function Metrics() {
    const [range, setRange] = useState<TimeRanges>("15m");

    return (
        <div className="flex flex-col gap-2">
            <div className="place-self-end">
                <TimeRangeToggle timeRanges={timeRanges} setRange={setRange} />
            </div>
            <div className='grid gap-2 grid-cols-1 lg:grid-cols-2'>
                <CpuChart range={range} />
                <MemChart range={range} />
            </div>
        </div>
    )
}
