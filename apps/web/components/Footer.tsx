import { XIcon } from '@/utils/SvgIcon'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Footer() {
    return (
        <div className="border-t flex justify-between items-center">
            <div className="text-sm text-muted-foreground text-center py-2 tracking-wide">
                Created by
                <Button variant={"link"} className='ml-2 p-0 tracking-normal'>
                    <Link href={"https://www.linkedin.com/in/muditkalra267"}>
                        Mudit kalra
                    </Link>
                </Button>
            </div>
            <div className="flex gap-6">
                <Link href={"https://www.linkedin.com/in/muditkalra267/"} className='text-primary'>
                    <Linkedin />
                </Link>
                <Link href={"https://x.com/muditkalra_45"} className='text-primary'>
                    <XIcon />
                </Link>
                <Link href={"https://github.com/muditkalra"} className='text-primary'>
                    <Github />
                </Link>
            </div>
        </div>
    )
}
