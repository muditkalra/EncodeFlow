import WorkerCards from '@/components/WorkerCards'
import React from 'react'

export default function page() {
	return (
		<div className='px-4 py-4'>
			<div className="text-xl">
				Workers
			</div>
			<div className="text-xs text-muted-foreground mt-1.5 mb-6">
				Manage monitor and scale job workers
			</div>
			<WorkerCards />
		</div>
	)
}
