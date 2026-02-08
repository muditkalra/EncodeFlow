import { API_URL } from "@/utils";
import { JobMetricData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useJobMetrics() {
    return useQuery<JobMetricData>({
        queryKey: ["jobMetricsData"],
        queryFn: () => axios.get(`${API_URL}/metricData`).then(res => res.data),
        refetchInterval: 1000 * 60, // every minute
        staleTime: 1000 * 45 // data fresh for 45 seconds
    })
}
