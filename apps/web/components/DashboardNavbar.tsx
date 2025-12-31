import { Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'

export default function DashboardNavbar() {
    return (
        <nav className='flex items-center justify-between top-0 z-10 p-3.5 border-b'>
            {/* trigger and name */}
            <div className="h-5 flex items-center gap-5">
                <SidebarTrigger />
                <Separator orientation='vertical' />
                <div className="">
                    Dashboard
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* search bar */}
                <div className="">
                    <Search />
                </div>


                {/* Theme toggle */}
                <ThemeToggle />

                {/* Profile dropdown */}
                {/* <SignedIn> */}
                {/* <ProfileButton /> */}
                {/* <UserButton /> */}
                {/* </SignedIn> */}
            </div>
        </nav>
    )
}
