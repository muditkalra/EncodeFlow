import { storage } from "@/utils/storage";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(defaultValue)

    useEffect(() => {
        const stored = storage.get<T>(key)
        if (stored !== null) {
            setValue(stored)
        }
    }, [key]);

    const updateValue = (newValue: T) => {
        setValue(newValue)
        storage.set(key, newValue)
    }

    return [value, updateValue] as const
}