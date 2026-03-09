"use client";

import { timeRanges, TimeRanges } from '@repo/types';
import { useState } from 'react';
import TimeRangeToggle from '../TimeRangeToggle';
import ApiCpuChart from './ApiCpuChart';
import ApiMemChart from './ApiMemChart';
import KpiSection from './KpiSection';
import WorkersCpuChart from './WorkersCpuChart';
import WorkersMemChart from './WorkersMemChart';


export default function Metrics() {
    const [range, setRange] = useState<TimeRanges>("15m");

    return (
        <div className="flex flex-col">
            <KpiSection />
            <div className="place-self-end mt-6">
                <TimeRangeToggle timeRanges={timeRanges} setRange={setRange} />
            </div>
            <div className='grid gap-4 grid-cols-1 lg:grid-cols-2 mt-2'>
                <div className="h-86">
                    <WorkersCpuChart range={range} />
                </div>
                <div className="h-86">
                    <WorkersMemChart range={range} />
                </div>
                <div className="h-86">
                    <ApiCpuChart range={range} />
                </div>
                <div className="h-86">
                    <ApiMemChart range={range} />
                </div>
            </div>
        </div>
    )
}
