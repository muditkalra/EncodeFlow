import { Cloud, EllipsisVertical, FilePlay, LayoutDashboard, List, LucideIcon, Search, Settings, User2 } from 'lucide-react';
import Link from 'next/link';

// import Logo from './Logo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface item {
	title: string;
	url: string;
	icon: LucideIcon
}
const items: item[] = [
	{
		title: "Dashboard",
		url: "/",
		icon: LayoutDashboard
	},
	{
		title: "Upload Video",
		url: "/upload",
		icon: FilePlay
	},
	{
		title: "Jobs",
		url: "/jobs",
		icon: List
	},
	{
		title: "Workers",
		url: "/workers",
		icon: Search
	},
	{
		title: "Storage",
		url: "/storage",
		icon: Cloud
	},
	{
		title: "Settings",
		url: "/setting",
		icon: Settings
	}
]


export default function AppSideBar() {
	return (
		<Sidebar>
			<SidebarHeader className="py-4">
				<SidebarMenu>
					<SidebarMenuItem >
						<SidebarMenuButton asChild>
							<Link href={"/"}>
								{/* <Logo size={110} /> */}
								{/* <Image src="/logo3.png" alt='logo' width={100} height={100} /> */}
								<span>video transcoder</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className=''>
				{items.map((item) => (
					<SidebarGroup className='py-1.5' key={item.title}>
						<SidebarGroupContent className=''>
							<SidebarMenuButton asChild className=''>
								<Link href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
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
