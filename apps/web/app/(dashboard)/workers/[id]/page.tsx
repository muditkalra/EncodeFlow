import { Button } from '@/components/ui/button';
import WorkerDetail from '@/components/WorkerId';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = decodeURIComponent((await params).id); // decodeURI: because of structure of workerId

    return (
        <div className='py-4 px-6'>
            <Button asChild variant={"outline"} size={"sm"} className='hover:underline'>
                <Link href={"/workers"}>
                    <MoveLeft className='size-4' /> Back to worker
                </Link>
            </Button>
            <WorkerDetail wid={id} />
        </div>
    )
}
