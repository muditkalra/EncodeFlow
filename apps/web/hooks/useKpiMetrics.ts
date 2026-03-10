import { KpiData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient";

export default function useKpiMetrics() {
    const { apiGET } = useApiClient();

    return useQuery<KpiData>({
        queryKey: ["kpi-data"],
        queryFn: ({ signal }) => apiGET('api/metrics/api/kpi', signal),
        refetchInterval: 1000 * 30, // every minute
        staleTime: 1000 * 25 // data fresh for 45 seconds
    })
}
