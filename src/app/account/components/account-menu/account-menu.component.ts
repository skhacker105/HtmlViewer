import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit, OnDestroy {

  isComponentActive = true;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
    console.log('loading account menu')
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  logout() {
    this.userService.logoutUser()
    .pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => { });
  }

}
