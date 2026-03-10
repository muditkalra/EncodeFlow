import { JobsColumnType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient";

export default function useJobsTable() {
    const { apiGET } = useApiClient();

    return useQuery<JobsColumnType[]>({
        queryKey: ["alljobs"],
        queryFn: ({ signal }) => apiGET('api/jobs/all', signal),
        refetchInterval: 1000 * 60, // every minute
        staleTime: 1000 * 45 // data fresh for 45 seconds
    })
}
