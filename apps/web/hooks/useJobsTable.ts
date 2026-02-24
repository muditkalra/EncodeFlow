import { JobsColumnType } from "@/types";
import { API_URL } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useJobsTable() {
    return useQuery<JobsColumnType[]>({
        queryKey: ["alljobs"],
        queryFn: ({ signal }) => axios.get(`${API_URL}/api/jobs/all`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 60, // every minute
        staleTime: 1000 * 45 // data fresh for 45 seconds
    })
}
