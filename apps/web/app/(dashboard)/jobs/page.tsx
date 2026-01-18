import JobsClient from './jobs-client'

export default function page() {
    return (
        <div className='px-6 py-4'>
            <div className="text-xl">
                Jobs
            </div>
            <div className="text-xs text-muted-foreground mt-1.5 mb-6">
                Manage and monitor background transcoding jobs
            </div>
            <JobsClient />
        </div>
    )
}
