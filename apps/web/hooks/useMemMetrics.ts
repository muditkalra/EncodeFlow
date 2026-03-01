import { API_URL } from "@/utils";
import { globalChartData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useMemMetrics() {
    return useQuery<globalChartData>({
        queryKey: ["mem-usage"],
        queryFn: ({ signal }) => axios.get(`${API_URL}/api/metrics/global/mem?range=1h`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
