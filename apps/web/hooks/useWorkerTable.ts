import { JobsColumnType } from "@/types";
import { API_URL } from "@/utils";
import { WorkerData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useWorkerTable() {
    return useQuery<WorkerData[]>({
        queryKey: ["allworkers"],
        queryFn: () => axios.get(`${API_URL}/allworkers`).then(res => res.data),
        refetchInterval: 1000 * 10, // every minute
        staleTime: 1000 * 6 // data fresh for 45 seconds
    })
}
