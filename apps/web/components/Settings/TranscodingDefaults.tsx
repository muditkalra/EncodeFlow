"use client";

import { defaultOutputConfig } from '@/utils';
import { type Format, formats, videoResolutions } from "@repo/types";
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';


export default function TranscodingDefaults() {
    return (
        <div className='flex flex-col gap-4 max-w-xl'>
            {/* <div className="text-sm text-muted-foreground">
                These config will be used, if no changes made during transcoding.
            </div> */}
            <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">
                    Select Default format
                </div>
                <RadioGroup
                    className='flex gap-10'
                    // value={defaultOutputConfig.format}
                    // onValueChange={(v: Format) => defaultOutputConfig.format = v}
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
            <div className="text-sm flex flex-col gap-4">
                <div className="text-muted-foreground">
                    Select Default Resolution
                </div>
                <Select
                    // value={config.resolution}
                    // onValueChange={(v: VideoResolution) => setConfig({ ...config, resolution: v })}
                    // disabled={disabled}
                >
                    <SelectTrigger className='min-w-3xs'>
                        <SelectValue placeholder="Select Default Resolution" />
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
            <Button>
                Save
            </Button>
        </div>
    )
}
