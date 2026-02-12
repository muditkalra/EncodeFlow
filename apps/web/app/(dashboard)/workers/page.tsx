import WorkerCards from '@/components/WorkerCards'
import WorkerTableClient from './workerTableClient'

export default function page() {
	return (
		<div className='px-4 py-4'>
			<div className="">
				<div className="text-xl">
					Workers
				</div>
				<div className="text-xs text-muted-foreground mt-1.5 mb-6">
					Manage monitor and scale job workers
				</div>
			</div>
			<div className="space-y-8">
				<WorkerCards />
				<WorkerTableClient />
			</div>
		</div>
	)
}
