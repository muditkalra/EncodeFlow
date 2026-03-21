import { XIcon } from '@/utils'
import { Github, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'

export default function Footer() {
    return (
        <div className="border-t flex justify-between items-center">
            <div className="text-sm text-muted-foreground text-center py-2 tracking-wide">
                Created by
                <Button variant={"link"} className='ml-2 p-0 tracking-normal'>
                    <Link href={"https://github.com/muditkalra"}>
                        Mudit kalra
                    </Link>
                </Button>
            </div>
            <div className="flex gap-6">
                <Link href={"https://www.linkedin.com/in/muditkalra267/"} className=''>
                    <Linkedin className='text-secondary' />
                </Link>
                <Link href={"https://x.com/muditkalra_45"}>
                    <XIcon className='text-secondary' />
                </Link>
                <Link href={"https://github.com/muditkalra/EncodeFlow"}>
                    <Github className='text-secondary' />
                </Link>
            </div>
        </div>
    )
}
