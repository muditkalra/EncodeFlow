import { WorkerData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient";

export default function useWorkerDetail(id: string) {
    const { apiGET } = useApiClient();

    return useQuery<WorkerData>({
        queryKey: ["worker", id],
        queryFn: ({ signal }) => apiGET(`api/workers/workerDetail/${id}`, signal),
        refetchInterval: 1000 * 10, // every 10 seconds 
        staleTime: 1000 * 8 // data fresh for 8 seconds
    })
}
