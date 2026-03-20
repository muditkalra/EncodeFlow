import StorageDefaults from '@/components/Settings/StorageDefaults';
import TranscodingDefaults from '@/components/Settings/TranscodingDefaults';
import WorkerQueueDefaults from '@/components/Settings/WorkerQueueDefaults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { currentUser } from '@clerk/nextjs/server';
import { Cpu, Database, LucideIcon, SlidersHorizontal } from 'lucide-react';
import { Metadata } from 'next';
import React from 'react';

interface Item {
	title: string;
	value: string;
	Icon: LucideIcon
	Comp: React.ComponentType<any>
}

const items: Item[] = [
	{
		title: "Transcoding Defaults",
		value: "transcoding",
		Icon: SlidersHorizontal,
		Comp: TranscodingDefaults
	},
	{
		title: "Worker & Queue",
		value: "workers",
		Icon: Cpu,
		Comp: WorkerQueueDefaults
	},
	{
		title: "Storage",
		value: "storage",
		Icon: Database,
		Comp: StorageDefaults
	},
]

export const metadata: Metadata = {
	title: "Settings",
	description: "Manage your default settings",
}


export default async function page() {
	const user = await currentUser();

	return (
		<div className="mt-4 px-6 flex flex-col gap-8">
			<div className="">
				<div className="text-2xl">
					Hello, {user?.emailAddresses[0]?.emailAddress}
				</div>
				<div className="text-xs text-muted-foreground mt-2">
					Manage your account settings and personal perferences.
				</div>
			</div>
			<Tabs defaultValue={items[0]?.value} className='w-full'>
				<TabsList className="w-full" variant={"line"}>
					{items.map(({ Icon, title, value }, idx) =>
						<TabsTrigger value={value} key={idx}>
							<Icon />
							{title}
						</TabsTrigger>
					)}
				</TabsList>
				{
					items.map(({ value, Comp }, idx) => (
						<TabsContent value={value} key={idx} className='p-6 w-full' >
							<Comp />
						</TabsContent>
					))
				}
			</Tabs>
		</div>
	)
}

