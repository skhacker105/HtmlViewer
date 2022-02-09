import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, ObservableInput } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IHTTPOptions } from "../interfaces/HttpOptions";
import { CoreResources } from "../utilities/resources";
import { MessagingService } from "./messaging.service";

@Injectable({
  providedIn: 'root'
})
export class HttpWrapperService {

  private httpOptions: IHTTPOptions;
  public httpError = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient, private router: Router, private messagingService: MessagingService) {
    this.httpOptions = this.geHttpHeaders();
  }

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error) {
      switch (error.status) {
        case 0:
          this.messagingService.showError(CoreResources.HTTPNoStatusError)
          break;
        case 403:
          this.messagingService.showError(CoreResources.Forbidden)
          break;
        case 401:
          this.httpError.next(error);
          this.router.navigateByUrl('/login');
          break;
      }
    }
    throw error;
  }

  updateHttpOptions(o: IHTTPOptions): HttpWrapperService {
    this.httpOptions = o;
    return this;
  }

  withCredentials(): HttpWrapperService {
    return this;
    // let newHeader = { ...this.httpOptions };
    // newHeader.withCredentials = true;
    // let newService = new HttpWrapperService(this.httpClient, this.router, this.messagingService).updateHttpOptions(newHeader);
    // return newService;
  }

  private geHttpHeaders(): IHTTPOptions {
    const h = new HttpHeaders();
    return {
      headers: h
    };
  }

  public getData<T>(url: string, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions: IHTTPOptions = options || this.httpOptions;
    return this.httpClient.get<T>(url, httpOptions as Object).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public postData<T>(url: string, body: any, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions: IHTTPOptions = options || this.httpOptions;
    return this.httpClient.post<T>(url, body, httpOptions as Object).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public putData<T>(url: string, body: any, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions: IHTTPOptions = options || this.httpOptions;
    return this.httpClient.put<T>(url, body, httpOptions as Object).pipe(
      catchError(error => this.handleError(error))
    );
  }

  public deleteData<T>(url: string, options?: IHTTPOptions): Observable<T> {
    url = environment.menuApi + url;
    const httpOptions: IHTTPOptions = options || this.httpOptions;
    return this.httpClient.delete<T>(url, httpOptions as Object).pipe(
      catchError(error => this.handleError(error))
    );
  }
}
