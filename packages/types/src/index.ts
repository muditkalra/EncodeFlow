export * from "./video";
export * from "./job";
export * from "./worker"
import { Status } from "@repo/db"

export type MetricKey = Lowercase<Status> | "total";

export type MetricData = Record<MetricKey, number>;