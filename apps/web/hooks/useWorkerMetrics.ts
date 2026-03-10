import { WorkerMetricData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient";

export default function useWorkerMetrics() {
    const { apiGET } = useApiClient();
    
    return useQuery<WorkerMetricData>({
        queryKey: ["workerMetricData"],
        queryFn: ({ signal }) => apiGET("api/workers/metricdata", signal),
        refetchInterval: 1000 * 10, // every 10 seconds
        staleTime: 1000 * 8 // data fresh for 8 seconds
    })
}
