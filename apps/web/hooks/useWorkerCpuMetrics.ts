import { API_URL } from "@/utils";
import { WorkerChartData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useWorkerCpuMetrics(workerId: string) {
    return useQuery<WorkerChartData>({
        queryKey: [workerId, "cpu-usage"],
        queryFn: ({ signal }) => axios.get(`${API_URL}/api/metrics/worker/${workerId}/cpu?range=1h`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
