import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
	return (
		<div className='px-6 py-4'>
			<div className="text-xl">
				Storage
			</div>
			<div className="text-xs text-muted-foreground mt-1.5 mb-6 tracking-wide">
				Find all the input files
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
				{Array.from({ length: 12 }).map((_, id) =>
					<Skeleton className='max-w-5xl h-85' key={id} />
				)}
			</div>
		</div>
	)
}
