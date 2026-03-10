import JobMetricCards from '@/components/JobMetricCards'
import RecentJobTable from '@/components/RecentJobTable'
import WorkerMetricCards from '@/components/WorkerMetricCards'

export default function page() {
	return (
		<div className="px-6 py-4 space-y-6">
			<JobMetricCards />
			<WorkerMetricCards view='home' />
			<RecentJobTable />
		</div>
	)
}
