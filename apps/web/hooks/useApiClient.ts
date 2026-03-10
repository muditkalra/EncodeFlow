import { API_URL } from "@/utils";
import { api } from "@/utils/axios";
import { useAuth } from "@clerk/nextjs";

export default function useApiClient() {
    const { getToken } = useAuth();

    async function apiGET(url: string, signal?: AbortSignal) {
        const token = await getToken();

        const res = await api.get(`${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            signal,
        });

        return res.data;
    }

    async function apiPOST<T>(url: string, body: T, signal?: AbortSignal) {
        const token = await getToken();

        const res = await api.post(`${url}`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            signal,
        });

        return res.data;
    }

    return { apiGET, apiPOST };
}