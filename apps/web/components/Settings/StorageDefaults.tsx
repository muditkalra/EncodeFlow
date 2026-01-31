import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

export default function StorageDefaults() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Auto-delete Failed outputs
                </div>
                <RadioGroup
                    className='flex gap-10'
                >
                    {["Yes", "No"].map((option, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Retention Period
                </div>
                <RadioGroup
                    className='flex gap-10'
                >
                    {["7 days", "14 days", "30 days"].map((option, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Max Upload Size (in GB)
                </div>
                <Input placeholder='Enter size' type='number' />
            </div>
        </div>
    )
}
