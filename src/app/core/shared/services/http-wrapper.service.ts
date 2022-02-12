import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ObservableInput, Subject } from "rxjs";
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
  private _userForbidden = new Subject<boolean>();
  public userForbidden = this._userForbidden.asObservable();
  public httpError = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient, private messagingService: MessagingService) {
    this.httpOptions = this.geHttpHeaders();
  }

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    if (error) {
      switch (error.status) {
        case 0:
          this.messagingService.showError(CoreResources.HTTPNoStatusError);
          break;
        case 404:
          this.messagingService.showError(CoreResources.RecordNotFound);
          break;
        case 401:
          this._userForbidden.next(true);
          this.messagingService.showError(CoreResources.Forbidden);
          break;
      }
    }
    throw error;
  }

  updateHttpOptions(o: IHTTPOptions): HttpWrapperService {
    this.httpOptions = o;
    return this;
  }

  private geHttpHeaders(): IHTTPOptions {
    const h = new HttpHeaders();
    return {
      headers: h,
      withCredentials: true
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
