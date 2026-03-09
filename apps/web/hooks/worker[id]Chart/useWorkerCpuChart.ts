import { API_URL } from "@/utils";
import { ChartData, TimeRanges } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useWorkerCpuChart(workerId: string, range: TimeRanges = "1h") {
    return useQuery<ChartData>({
        queryKey: [workerId, "cpu-usage", range],
        queryFn: ({ signal }) => axios.get(`${API_URL}/api/metrics/worker/${workerId}/cpu?range=${range}`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
