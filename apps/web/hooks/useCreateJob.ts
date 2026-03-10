import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApiClient from "./useApiClient";
import { ActiveJob, TranscodeJobBody } from "@repo/types";

export default function useCreateJob(options?: { onSuccess?: () => void, onError?: (error: Error) => void }) {
    const { apiPOST } = useApiClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: TranscodeJobBody) => apiPOST("api/jobs/createJob", payload),
        onMutate: async (payload: TranscodeJobBody) => {
            await queryClient.cancelQueries({ queryKey: ["active-jobs"] });

            const newActiveJob: ActiveJob = {
                id: Math.floor(Math.random() * 1000).toString(),
                progress: 0,
                status: 'PENDING',
                video: { name: payload.fileName },
                createdAt: new Date().toString()
            };
            const previousActiveJobs = queryClient.getQueryData<ActiveJob[]>(["active-jobs"]);

            queryClient.setQueryData<ActiveJob[]>(['active-jobs'], (old = []) => [newActiveJob, ...old]);

            return { previousActiveJobs };
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["active-jobs"] })
        },
        onSuccess: () => {
            options?.onSuccess?.();
        },
        onError: (error, newActiveJob, context) => {
            queryClient.setQueryData(["active-jobs"], context?.previousActiveJobs);
            options?.onError?.(error);
        }
    });
}