import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment.prod';

export class CoreHelper {
    public static generateId(): string {
        return window.URL.createObjectURL(new Blob([])).substring(31);
    }

    public static encrypt(str: string): string {
        return btoa(str);
    }

    public static decrypt(str: string): string {
        return atob(str);
    }
}