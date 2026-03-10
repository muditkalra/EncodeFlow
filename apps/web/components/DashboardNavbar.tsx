"use client";
import { Show, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

export default function DashboardNavbar() {
    const path = usePathname();
    const currentPage = path.split("/")[1];

    return (
        <nav className='flex items-center justify-between top-0 z-10 p-3.5 border-b'>
            {/* trigger and name */}
            <div className="h-5 flex items-center gap-5">
                <SidebarTrigger title='ctrl + b' />
                <Separator orientation='vertical' />
                <div className="capitalize">
                    {currentPage}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </nav>
    )
}
