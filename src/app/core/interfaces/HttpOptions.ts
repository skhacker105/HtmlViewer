import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface IHTTPOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'response' | 'body' | 'events';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'blob' | 'arraybuffer' | 'json';
    withCredentials?: boolean;
}