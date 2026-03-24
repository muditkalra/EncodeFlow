import { WorkerData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient";

export default function useWorkerTable() {
    const { apiGET } = useApiClient();

    return useQuery<WorkerData[]>({
        queryKey: ["allworkers"],
        queryFn: ({ signal }) => apiGET('api/workers/all', signal),
        refetchInterval: 1000 * 10, // every 10 seconds
        staleTime: 1000 * 8 // data fresh for 8 seconds
    })
}
