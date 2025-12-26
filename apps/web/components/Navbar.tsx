// import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default async function Navbar() {

    return (
        <nav className='flex justify-between items-center border-b py-3 px-1'>
            <Link href="/" className='flex items-center gap-2'>
                {/* <Image src={"/costtrack-logo.png"} alt='Logo' width={55} height={55} className='size-12' /> */}
                Video transcoder
            </Link>
            <div className="flex gap-4">
                <ThemeToggle />
            </div>
        </nav>
    )
}
