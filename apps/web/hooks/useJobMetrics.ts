"use client";
import { JobMetricData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import useApiClient from "./useApiClient";

export default function useJobMetrics() {
    const { apiGET } = useApiClient();

    return useQuery<JobMetricData>({
        queryKey: ["jobMetricsData"],
        queryFn: ({ signal }) => apiGET('api/jobs/metricsdata', signal),
        refetchInterval: 1000 * 60, // every minute
        staleTime: 1000 * 45 // data fresh for 45 seconds
    })
}
