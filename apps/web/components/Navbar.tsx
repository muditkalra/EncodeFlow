// import Image from 'next/image';
import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

export default async function Navbar() {

    return (
        <nav className='flex justify-between items-center border-b py-3 px-1'>
            <Link href="/" className='flex items-center gap-2'>
                {/* <Image src={"/costtrack-logo.png"} alt='Logo' width={55} height={55} className='size-12' /> */}
                Video transcoder
            </Link>
            <div className="flex gap-4 items-center">
                <ThemeToggle />
                <Show when="signed-out">
                    <SignInButton mode='modal'>
                        <Button variant={"ghost"}>
                            Sign In
                        </Button>
                    </SignInButton>
                </Show>
            </div>
        </nav>
    )
}
