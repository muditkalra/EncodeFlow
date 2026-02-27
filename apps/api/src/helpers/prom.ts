import axios from "axios";
import { promUrl } from "../config/constants";

export const queryRange = async (query: string, start: number, end: number, step: string) => {
    try {
        const url = new URL(`${promUrl}/api/v1/query_range`);
        url.searchParams.append("query", query);
        url.searchParams.append("start", start.toString());
        url.searchParams.append("end", end.toString());
        url.searchParams.append("step", step);
        
        const resp = (await axios.get(url.toString())).data;
        const data = resp.data.result
        return data;
    } catch (error) {
        throw new Error(`Cannot Fetch query range for query=${query}`);
    }
}