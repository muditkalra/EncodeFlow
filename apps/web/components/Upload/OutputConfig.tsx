// "use client";
import { OutputConfigType, UploadState } from '@/types'
import { type Format, type VideoResolution, formats, videoResolutions } from "@repo/types"
import { Dispatch, SetStateAction } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface props {
    config: OutputConfigType,
    setConfig: Dispatch<SetStateAction<OutputConfigType>>,
    disabled: boolean;
    uploadState: UploadState;
}

export default function OutputConfig({ config, setConfig, disabled, uploadState }: props) {
    return (
        <div className="gap-4 flex flex-col py-2">
            <div>
                <div className="font-semibold">
                    Output Configuration
                </div>
            </div>

            <div className="flex flex-col gap-6">
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
        </div>
    )

}
