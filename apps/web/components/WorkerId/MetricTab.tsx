import React from 'react'
import CpuChart from './CpuChart'
import MemChart from './MemChart'

export default function MetricTab({ wid }: { wid: string }) {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <div className="h-4/5">
                <CpuChart wid={wid} />
            </div>
            <div className="h-4/5">
                <MemChart wid={wid} />
            </div>
        </div>
    )
}
