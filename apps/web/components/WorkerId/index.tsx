"use client";

import useWorkerDetail from "@/hooks/useWorkerDetail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import MetricTab from "./MetricTab";
import OverviewTab from "./OverviewTab";
import WorkerHeader from "./WorkerHeader";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function WorkerDetail({ wid }: { wid: string }) {
	const { data, error } = useWorkerDetail(wid);

	if (error) {
		toast.error("Worker not available");
		redirect("/workers");
	}

	return (
		<>
			<WorkerHeader wid={wid} data={data} />
			<Tabs defaultValue="overview" className='w-full'>
				<TabsList className='w-full' variant={"line"}>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="metrics">Metrics</TabsTrigger>
				</TabsList>
				<TabsContent value='overview' className='mt-4'>
					<OverviewTab data={data} />
				</TabsContent>
				<TabsContent value="metrics" className="mt-4">
					<MetricTab wid={wid} />
				</TabsContent>
			</Tabs>
		</>
	)
}
