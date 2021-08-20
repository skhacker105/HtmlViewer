export class CoreHelper {
    public static generateId(): string {
        return window.URL.createObjectURL(new Blob([])).substring(31);
    }
}