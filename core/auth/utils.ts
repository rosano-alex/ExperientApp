export function GUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.floor(Math.random() * 16);
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}



export function generateTTL(daysToAdd: number): number {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const secondsToAdd = daysToAdd * 86400;
    return nowInSeconds + secondsToAdd;
}
// utils
export function getCurrentTime(): number {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return nowInSeconds;
}

export function isExpired(ttl: number): boolean {
    return getCurrentTime() > ttl;
}

