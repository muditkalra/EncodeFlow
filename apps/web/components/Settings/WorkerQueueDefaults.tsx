import React from 'react'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function WorkerQueueDefaults() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Max Concurrent Jobs
                </div>
                <Select>
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
                <Select>
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
                >
                    {["15", "30", "45", "60"].map((option, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}
