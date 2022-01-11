import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface IHTTPOptions {
    headers: HttpHeaders;
    observe: string;
    params?: HttpParams;
    reportProgress?: boolean;
    withCredentials?: boolean;
}