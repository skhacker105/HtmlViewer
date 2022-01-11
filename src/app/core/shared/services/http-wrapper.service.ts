import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IHTTPOptions } from "../interfaces/HttpOptions";

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  private httpOptions: IHTTPOptions;
  constructor(private httpClient: HttpClient) { 
    this.httpOptions = this.getDefaultHttpOptions();
  }

  private getDefaultHttpOptions(): IHTTPOptions {
    return {
      headers: this.geHttpHeaders(),
      observe: 'body'
    };
  }

  private geHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers;
  }

  public getData<T>(url: string, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions = options || this.httpOptions;
    return this.httpClient.get<T>(url, httpOptions as Object).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public postData<T>(url: string, body: any, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions = options || this.httpOptions;
    return this.httpClient.post<T>(url, body, httpOptions as Object).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public putData<T>(url: string, body: any, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions = options || this.httpOptions;
    return this.httpClient.put<T>(url, body, httpOptions as Object).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  public deleteData<T>(url: string, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions = options || this.httpOptions;
    return this.httpClient.delete<T>(url, httpOptions as Object).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
