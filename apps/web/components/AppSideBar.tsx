"use client";

import { ChartArea, CloudUpload, Cpu, Database, EllipsisVertical, LayoutDashboard, List, LucideIcon, Settings, User2 } from 'lucide-react';
import Link from 'next/link';
// import Logo from './Logo';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface Item {
	title: string;
	url: string;
	Icon: LucideIcon
}
const items: Item[] = [
	{
		title: "Dashboard",
		url: "/",
		Icon: LayoutDashboard
	},
	{
		title: "Upload Video",
		url: "/upload-video",
		Icon: CloudUpload
	},
	{
		title: "Jobs",
		url: "/jobs",
		Icon: List
	},
	{
		title: "Workers",
		url: "/workers",
		Icon: Cpu
	},
	{
		title: "Metrics",
		url: "/metrics",
		Icon: ChartArea
	},
	{
		title: "Storage",
		url: "/storage",
		Icon: Database
	},
	{
		title: "Settings",
		url: "/settings",
		Icon: Settings
	}
]


export default function AppSideBar() {
	const pathname = usePathname();
	const isActive = (href: string) => pathname == href || pathname.startsWith(href) && href !== "/";

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className="py-4">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link href={"/"}>
								{/* <Logo size={110} /> */}
								{/* <Image src="/logo3.png" alt='logo' width={100} height={100} /> */}
								<span>Video Transcoder</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className='mt-1'>
				{items.map(({ Icon, title, url }) => (
					<SidebarGroup className='py-1.5' key={title}>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuButton asChild isActive={isActive(url)} className='data-[active=true]:bg-primary data-[active=true]:text-primary-foreground' >
										<Link href={url}>
											<Icon />
											<span>{title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>))}
			</SidebarContent>
			<SidebarFooter className='mb-8'>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> Admin
									<EllipsisVertical className='ml-auto' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="left"
								className=""
							>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Billing</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar >
	)
}
