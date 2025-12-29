import React from 'react'
import MetricCard from './MetricCard'
import { XCircle } from 'lucide-react'

export default function FailedJobs() {
    return (
        <MetricCard title='Failed Jobs' value={3} icon={<XCircle className='size-4 text-red-500' />} subText={"Number of Jobs failed"} />
    )
}
