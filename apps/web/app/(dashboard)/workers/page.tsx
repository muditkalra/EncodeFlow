import WorkerMetricCards from '@/components/WorkerMetricCards'
import WorkerTableClient from './workerTableClient'

export default function page() {
	return (
		<div className='px-6 py-4'>
			<div className="">
				<div className="text-xl">
					Workers
				</div>
				<div className="text-xs text-muted-foreground mt-1 mb-6">
					Manage monitor and scale job workers
				</div>
			</div>
			<div className="space-y-8">
				<WorkerMetricCards />
				<WorkerTableClient />
			</div>
		</div>
	)
}
