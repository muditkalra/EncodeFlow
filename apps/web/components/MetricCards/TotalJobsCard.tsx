import { ListCheck } from 'lucide-react'
import MetricCard from './MetricCard'

export default function TotalJobsCard() {

    return (
        <MetricCard title='Total Jobs' value={120} icon={<ListCheck className='size-4' />} subText={"Total jobs till now"} />
    )
}
