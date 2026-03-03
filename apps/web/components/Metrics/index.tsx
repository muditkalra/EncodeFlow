"use client";

import TimeRangeToggle from '../TimeRangeToggle'
import CpuChart from './CpuChart'
import MemChart from './MemChart'
import { useState } from 'react'
import KpiSection from './KpiSection';
import { timeRanges, TimeRanges } from '@repo/types';


export default function Metrics() {
    const [range, setRange] = useState<TimeRanges>("15m");

    return (
        <div className="flex flex-col">
            <KpiSection />
            <div className="place-self-end mt-6">
                <TimeRangeToggle timeRanges={timeRanges} setRange={setRange} />
            </div>
            <div className='grid gap-2 grid-cols-1 lg:grid-cols-2 mt-1.5'>
                <CpuChart range={range} />
                <MemChart range={range} />
            </div>
        </div>
    )
}
