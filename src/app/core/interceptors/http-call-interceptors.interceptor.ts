import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@core/shared/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpCallInterceptorsInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private cookieService: CookieService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // if (this.userService.loggedInUser.value) {
    //   request = request.clone({
    //     setHeaders: { Authorization: `Bearer ${this.cookieService.get('token')}` }
    //   });
    // }
    return next.handle(request);
  }
}