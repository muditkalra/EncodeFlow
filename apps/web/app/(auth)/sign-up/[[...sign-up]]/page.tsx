import { SignUp } from '@clerk/nextjs'
import { Metadata } from 'next';
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'EncodeFlow | Sign-Up',
    description: 'Sign Up page for EncodeFlow',
};

export default function SignUpPage() {
    return (
        <div className="flex flex-col h-screen">
            <Link href="/" className='flex items-center gap-2 mt-10 px-4'>
                <Image src={"/logo.png"} alt='Logo' width={100} height={100} className='size-12' />
                EncodeFlow
            </Link>
            <div className="flex flex-col gap-6 items-center justify-center flex-1">
                <SignUp />
                <div className="text-center text-muted-foreground text-xs">
                    By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.
                </div>
            </div>
        </div>
    )
}