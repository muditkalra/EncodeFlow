import { Show, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

export default async function Navbar() {

    return (
        <nav className='flex justify-between items-center border-b py-3 px-1'>
            <Link href="/" className='flex items-center gap-2'>
                <Image src={"/logo.png"} alt='Logo' width={100} height={100} className='size-12' />
                EncodeFlow
            </Link>
            <div className="flex gap-4 items-center">
                <ThemeToggle />
                <Show when="signed-out">
                    <SignInButton mode='modal'>
                        <Button variant={"outline"}>
                            Sign In
                        </Button>
                    </SignInButton>
                </Show>
                <Show when="signed-in">
                    <UserButton />
                </Show>
            </div>
        </nav>
    )
}
