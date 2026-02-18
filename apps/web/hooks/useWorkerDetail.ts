import { API_URL } from "@/utils";
import { WorkerData } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useWorkerDetail(id: string) {
    return useQuery<WorkerData>({
        queryKey: ["worker", id],
        queryFn: ({ signal }) => axios.get(`${API_URL}/worker/${id}`, { signal }).then(res => res.data),
        refetchInterval: 1000 * 10, // every 10 seconds 
        staleTime: 1000 * 8 // data fresh for 8 seconds
    })
}
