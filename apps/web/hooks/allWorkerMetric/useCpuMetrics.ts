import { API_URL } from "@/utils";
import { globalChartData, TimeRanges } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCpuMetrics(range: TimeRanges = "1h") {
    return useQuery<globalChartData>({
        queryKey: ["cpu-usage", range],
        queryFn: ({ signal }) => axios.get(`${API_URL}/api/metrics/worker/all/cpu?range=${range}`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
