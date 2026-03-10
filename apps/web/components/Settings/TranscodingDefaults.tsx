"use client";

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultOutputConfig } from '@/utils';
import { type Format, formats, VideoResolution, videoResolutions } from "@repo/types";
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';


export default function TranscodingDefaults() {

    const [outputConfig, setOutputConfig] = useLocalStorage("transcoding-default", defaultOutputConfig);

    return (
        <div className='flex flex-col gap-6'>
            <div className="text-sm text-muted-foreground">
                This will set your default configuration for easier use next time.
            </div>
            <div className="space-y-4 text-sm">
                <div className="text-muted-foreground">
                    Select Default format
                </div>
                <RadioGroup
                    className='flex gap-10'
                    value={outputConfig.format}
                    onValueChange={(v: Format) => setOutputConfig({ ...outputConfig, format: v })}
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
                    value={outputConfig.resolution}
                    onValueChange={(v: VideoResolution) => setOutputConfig({ ...outputConfig, resolution: v })}
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
            <div className="flex gap-4">
                <Checkbox id='audioInclude' checked={outputConfig.includeAudio} onCheckedChange={(v) => setOutputConfig({ ...outputConfig, includeAudio: Boolean(v) })} />
                <Label htmlFor='audioInclude' className='text-muted-foreground'>Include Audio</Label>
            </div>
            <div className="space-x-4 place-self-end">
                <Button variant={"outline"} onClick={() => { setOutputConfig(defaultOutputConfig); toast.info("Output config set to default") }}>
                    Reset to default
                </Button>
                <Button variant={"secondary"} onClick={() => { setOutputConfig(outputConfig); toast.success("Output Config changed") }}>
                    Save and update
                </Button>
            </div>
        </div>
    )
}
