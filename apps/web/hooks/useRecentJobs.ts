import { RecentJob } from '@repo/types'
import { useQuery } from '@tanstack/react-query'
import useApiClient from './useApiClient';

export default function useRecentJobs() {
    const { apiGET } = useApiClient();
    
    return useQuery<RecentJob[]>({
        queryKey: ["recent-jobs"],
        queryFn: ({ signal }) => apiGET("api/jobs/recent", signal),
        refetchInterval: 1000 * 15, //every 15 second
    })

}
