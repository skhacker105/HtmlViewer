import { Injectable } from '@angular/core';
import { IUserBasic } from '@core/shared/interfaces/User';
import { HttpWrapperService } from '@core/shared/services/http-wrapper.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoreResources } from '../utilities/resources';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedInUser = new BehaviorSubject<IUserBasic>(null);
  private localstorageUserKey = 'user';

  constructor(private httpService: HttpWrapperService) { }

  loginUser(userName: string, password: string): Observable<IUserBasic> {
    const loginData = { userName, password };
    return this.httpService.withCredentials().postData<IUserBasic>(CoreResources.LoginApiUrl.Login, loginData);
  }

  logoutUser(): Observable<IUserBasic> {
    return this.httpService.getData(CoreResources.LoginApiUrl.Logout);
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

  resetLoggedInUser() {
    this.loggedInUser.next(null);
    localStorage.removeItem(this.localstorageUserKey);
  }
}
