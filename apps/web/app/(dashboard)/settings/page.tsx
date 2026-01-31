import StorageDefaults from '@/components/Settings/StorageDefaults';
import TranscodingDefaults from '@/components/Settings/TranscodingDefaults';
import User from '@/components/Settings/User';
import WorkerQueueDefaults from '@/components/Settings/WorkerQueueDefaults';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs';
import { Cpu, Database, LucideIcon, SlidersHorizontal, UserRoundCog } from 'lucide-react';
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
	{
		title: "User",
		value: "users",
		Icon: UserRoundCog,
		Comp: User
	}
]



export default function page() {
	return (
		<div className="py-4 px-6 flex flex-col gap-8">
			<div className="">
				<div className="text-xl">
					USERNAME 
				</div>
				<div className="text-xs text-muted-foreground mt-1.5">
					Manage your details and personal perferences here.
				</div>
			</div>
			<Tabs defaultValue={items[0]?.value} className=''>
				<TabsList className='w-full max-w-4xl' variant={"line"}>
					{items.map(({ Icon, title, value }, idx) =>
						<TabsTrigger value={value} key={idx}>
							<Icon />
							{title}
						</TabsTrigger>
					)}
				</TabsList>
				{
					items.map(({ value, Comp }, idx) => (
						<TabsContent value={value} key={idx} className='p-6 mb-5'>
							<Comp />
						</TabsContent>
					))
				}
			</Tabs>
		</div>
	)
}

