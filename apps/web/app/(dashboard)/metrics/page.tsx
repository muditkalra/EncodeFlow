import Metrics from '@/components/Metrics'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: "Global Metrics",
	description: "Monitor and observe your Worker and API",
}

export default function page() {
    return (
        <div className='px-6 py-4'>
            <div className="text-xl">
                System Metrics
            </div>
            <div className="text-xs text-muted-foreground mt-1.5 mb-6 tracking-wide">
                Metrics for observability and monitoring
            </div>
            <Metrics />
        </div>
    )
}
