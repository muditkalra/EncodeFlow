"use client";

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { workerDefaults } from '@/utils';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function WorkerQueueDefaults() {

    const [workerConfig, setWorkerConfig] = useLocalStorage("worker-default", workerDefaults);


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Max Concurrent Jobs
                </div>
                <Select
                    value={workerConfig.maxConcurrent.toString()}
                    onValueChange={(v) => setWorkerConfig({ ...workerConfig, maxConcurrent: Number(v) })}
                >
                    <SelectTrigger className='min-w-3xs'>
                        <SelectValue placeholder="Select max" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["2", "4", "5", "8", "10"].map((options, idx) => (
                                <SelectItem value={options} key={idx}>{options}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Retry Count
                </div>
                <Select
                    value={workerConfig.retryCount.toString()}
                    onValueChange={(v) => setWorkerConfig({ ...workerConfig, retryCount: Number(v) })}
                >
                    <SelectTrigger className='min-w-3xs'>
                        <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {["1", "2", "3", "5"].map((options, idx) => (
                                <SelectItem value={options} key={idx}>{options}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Job Timeout (in Mins)
                </div>
                <RadioGroup
                    className='flex gap-10'
                    value={workerConfig.jobTimeout.toString()}
                    onValueChange={(v) => setWorkerConfig({ ...workerConfig, jobTimeout: Number(v) })}
                >
                    {["10", "20", "30", "45"].map((option, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Worker HeartBeat TTL (in Seconds)
                </div>
                <RadioGroup
                    className='flex gap-10'
                    value={workerConfig.workerheartbeat.toString()}
                    onValueChange={(v) => setWorkerConfig({ ...workerConfig, workerheartbeat: Number(v) })}
                >
                    {["15", "30", "45", "60"].map((option, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div className="space-x-4 place-self-end mt-5">
                <Button variant={"outline"} onClick={() => { setWorkerConfig(workerDefaults); toast.info("Worker config set to default"); }}>
                    Reset to default
                </Button>
                <Button variant={"secondary"} onClick={() => { setWorkerConfig(workerConfig); toast.success("Worker Config changed"); }}>
                    Save and update
                </Button>
            </div>
        </div>
    )
}
