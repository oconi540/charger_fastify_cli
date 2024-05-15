export function generateToken(): string {
    const currentTime: string = new Date().getTime().toString();
    const randomValue: string = Math.floor(Math.random() * 10000).toString();
    return currentTime + randomValue;
}