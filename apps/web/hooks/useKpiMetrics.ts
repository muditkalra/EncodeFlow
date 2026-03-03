import { API_URL } from "@/utils";
import { KpiData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useKpiMetrics() {
    return useQuery<KpiData>({
        queryKey: ["kpi-data"],
        queryFn: ({ signal }) => axios.get(`${API_URL}/api/metrics/global/kpi`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
