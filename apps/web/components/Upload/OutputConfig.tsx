// "use client";
import React, { Dispatch, SetStateAction } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Checkbox } from '../ui/checkbox'
import { OutputConfigType } from '@/types'
import { type Format, type VideoResolution, formats, videoResolutions } from "@repo/types"
import { Label } from '../ui/label'

interface props {
    config: OutputConfigType,
    setConfig: Dispatch<SetStateAction<OutputConfigType>>,
    disabled: boolean
}

export default function OutputConfig({ config, setConfig, disabled }: props) {
    return (
        <div className="gap-4 flex flex-col py-2">
            <div>
                <div className="font-semibold">
                    Output Configuration
                </div>
            </div>

            {/* Format */}
            <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">
                    Output format
                </div>
                <RadioGroup
                    value={config.format}
                    onValueChange={(v: Format) => setConfig({ ...config, format: v })}
                    className='flex gap-6'
                    disabled={disabled}
                >
                    {formats.map((format, idx) => (
                        <div className="flex gap-2 items-center" key={idx}>
                            <RadioGroupItem value={format} id={format} />
                            <Label htmlFor={format}>{format}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Resolution */}
            <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">
                    Output Resolution
                </div>
                <Select
                    value={config.resolution}
                    onValueChange={(v: VideoResolution) => setConfig({ ...config, resolution: v })}
                    disabled={disabled}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Resolution" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {videoResolutions.map((resolution, idx) => (
                                <SelectItem value={resolution} key={idx}>{resolution}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Audio include */}
            <div className="flex gap-4 items-center">
                <Checkbox id='audioInclude' checked={config.includeAudio} onCheckedChange={(v) => { setConfig({ ...config, includeAudio: Boolean(v) }); console.log(v, "status"); }} disabled={disabled} />
                <Label htmlFor='audioInclude' className='text-muted-foreground'>Include Audio</Label>
            </div>
        </div>
    )

}
