"use client";
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { storageDefaults } from '@/utils';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export default function StorageDefaults() {

    const [storageConfig, setStorageConfig] = useLocalStorage("storage-default", storageDefaults);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col max-w-sm gap-3">
                <div className="ml-0.5 text-sm text-muted-foreground">
                    Auto-delete Failed outputs
                </div>
                <RadioGroup
                    className='flex gap-10'
                    value={storageConfig.autoDelete}
                    onValueChange={(v) => setStorageConfig({ ...storageConfig, autoDelete: v })}
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
                    value={storageConfig.retentionPeriod}
                    onValueChange={(v) => setStorageConfig({ ...storageConfig, retentionPeriod: v })}
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
                <Input placeholder='Enter size' type='number'
                    value={storageConfig.maxSize}
                    onChange={(e) => { setStorageConfig({ ...storageConfig, maxSize: Number(e.target.value) }) }}
                />
            </div>
            <div className="space-x-4 place-self-end mt-5">
                <Button variant={"outline"} onClick={() => { setStorageConfig(storageDefaults); toast.info("Storage config set to default"); }}>
                    Reset to default
                </Button>
                <Button variant={"secondary"} onClick={() => { setStorageConfig(storageConfig); toast.success("Storage Config changed"); }}>
                    Save and update
                </Button>
            </div>
        </div>
    )
}
