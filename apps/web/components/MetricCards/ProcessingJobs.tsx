import React from 'react'
import MetricCard from './MetricCard'
import { Loader2 } from 'lucide-react'

export default function ProcessingJobs() {
    return (
        <MetricCard title='Processing Jobs' value={3} icon={<Loader2 className='size-4 animate-spin text-blue-500' />} subText={"Number of Jobs Processing"} />
    )
}
