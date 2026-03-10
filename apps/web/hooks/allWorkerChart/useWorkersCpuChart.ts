import { ChartData, TimeRanges } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "../useApiClient";

export default function useWorkersCpuChart(range: TimeRanges = "1h") {
    const { apiGET } = useApiClient();


    return useQuery<ChartData>({
        queryKey: ["all-worker-cpu-usage", range],
        queryFn: ({ signal }) => apiGET(`api/metrics/worker/all/cpu?range=${range}`, signal),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
