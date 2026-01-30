"use client";

import { defaultOutputConfig } from '@/utils';
import { type Format, formats } from "@repo/types";
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';


export default function TranscodingDefaults() {
    return (
        <div>
            <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">
                    Output format
                </div>
                <RadioGroup
                    value={defaultOutputConfig.format}
                    onValueChange={(v: Format) => defaultOutputConfig.format = v}
                    className='flex gap-6'
                // disabled={disabled}
                >
                    {formats.map((format, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={format} id={format} />
                            <Label htmlFor={format}>{format}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    )
}
