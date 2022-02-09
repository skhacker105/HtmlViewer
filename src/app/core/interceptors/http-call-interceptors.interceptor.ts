import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@core/shared/services/user.service';

@Injectable()
export class HttpCallInterceptorsInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userService.loggedInUser.value) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.userService.loggedInUser.value.token}` },
        withCredentials: true
      });
    } else {
      request = request.clone({
        withCredentials: false
      });
    }
    return next.handle(request);
  }
}
