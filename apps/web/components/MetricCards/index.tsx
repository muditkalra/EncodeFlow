import CompletedJobs from './CompletedJobs'
import FailedJobs from './FailedJobs'
import ProcessingJobs from './ProcessingJobs'
import TotalJobsCard from './TotalJobsCard'

const cards = [
    {
        title: "Total Jobs",
        value: 124,
        footer: "Total Jobs completed till now",
    },
    {
        title: "Processing",
        value: 4,
        footer: "Number of Jobs Processing",
    },
    {
        title: "Failed",
        value: 2,
        footer: "Number of Jobs failed",
    },
    {
        title: "Average Processing Time",
        value: 42,
        footer: "Total Jobs completed till now",
    },
]



export default function MetricCards() {
    return (
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4 mt-2 mx-4">
            <TotalJobsCard />
            <ProcessingJobs />
            <CompletedJobs />
            <FailedJobs />
        </div>
    )
}
