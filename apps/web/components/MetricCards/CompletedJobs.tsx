"use client";

import React from 'react'
import MetricCard from './MetricCard'
import { CheckCircle } from 'lucide-react'

export default function CompletedJobs() {
    return (
        <MetricCard title='Completed Jobs' value={114} icon={<CheckCircle className='size-4 text-green-500' />} subText={"Number of jobs completed"} />
    )
}
