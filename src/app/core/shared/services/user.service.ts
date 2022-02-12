import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserBasic } from '@core/shared/interfaces/User';
import { HttpWrapperService } from '@core/shared/services/http-wrapper.service';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreResources } from '../utilities/resources';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedInUser = new BehaviorSubject<IUserBasic>(null);
  public secondsRemaining = new BehaviorSubject<number>(0);
  private localstorageUserKey = 'user';

  constructor(private httpService: HttpWrapperService, private router: Router) {
    this.httpService.userForbidden.subscribe(res => {
      if (res) {
        this.processAfterLogout();
      }
    });
  }

  loginUser(userName: string, password: string): Observable<IUserBasic> {
    const loginData = { userName, password };
    return this.httpService.postData<IUserBasic>(CoreResources.LoginApiUrl.Login, loginData)
    .pipe(
      tap(res => {
        this.setLoggedInUser(res);
      })
    );
  }

  logoutUser(): Observable<any> {
    return this.httpService.getData(CoreResources.LoginApiUrl.Logout)
    .pipe(
      tap(res => {
        this.processAfterLogout();
      })
    );
  }

  processAfterLogout() {
    this.resetLoggedInUser();
    this.router.navigateByUrl('/login');
  }

  setLoggedInUser(user: IUserBasic): void {
    localStorage[this.localstorageUserKey] = JSON.stringify(user);
    this.loggedInUser.next(user);
  }

  restoreLoggedInUser() {
    if (localStorage[this.localstorageUserKey]) {
      this.loggedInUser.next(JSON.parse(localStorage[this.localstorageUserKey]));
    }
  }

  loadUpdatedLoginInfo(): boolean {
    let newUserFound = false;
    if (localStorage[this.localstorageUserKey] && this.loggedInUser.value) {
      const local_user: IUserBasic = JSON.parse(localStorage[this.localstorageUserKey]);
      if (local_user.expiry != this.loggedInUser.value.expiry) {
        this.resetLoggedInUser();
        newUserFound = true;
      }
    }
    return newUserFound;
  }

  resetLoggedInUser() {
    this.loggedInUser.next(null);
    localStorage.removeItem(this.localstorageUserKey);
  }
}
