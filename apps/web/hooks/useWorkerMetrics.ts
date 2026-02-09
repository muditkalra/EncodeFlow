import { API_URL } from "@/utils";
import { WorkerMetricData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useWorkerMetrics() {
    return useQuery<WorkerMetricData>({
        queryKey: ["workerMetricData"],
        queryFn: () => axios.get(`${API_URL}/workersmetricdata`).then(res => res.data),
        refetchInterval: 1000 * 10, // 
        staleTime: 1000 * 8 // data fresh for 8 seconds
    })
}
