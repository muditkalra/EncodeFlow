export const storage = {
    get<T>(key: string): T | null {
        if (typeof window === "undefined") return null

        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : null
    },

    set<T>(key: string, value: T) {
        if (typeof window === "undefined") return
        localStorage.setItem(key, JSON.stringify(value))
    },

    remove(key: string) {
        if (typeof window === "undefined") return
        localStorage.removeItem(key)
    }
}