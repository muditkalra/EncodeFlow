import JobTableClient from './jobTableclient'

export default function page() {
    return (
        <div className='px-6 py-4'>
            <div className="text-xl">
                Jobs
            </div>
            <div className="text-xs text-muted-foreground mt-1 mb-6">
                Manage and monitor background transcoding jobs
            </div>
            <JobTableClient />
        </div>
    )
}
