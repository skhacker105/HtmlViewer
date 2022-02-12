import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { LoginComponent } from '@core/components/login/login.component';
import { PagePopupComponent } from '@core/components/page-popup/page-popup.component';
import { MessagingService } from '@core/shared/services/messaging.service';
import { UserService } from '@core/shared/services/user.service';
import { LoginPageForm } from '@core/shared/utilities/enumerations';
import { ProducMenuService } from '@header/shared/services/product-menu.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'HTMLView';
  foreverInterval = 1000 * 60 * 60 * 24 * 365; // 1 year
  standardInterval = 5000; // 5 seconds
  countDownInterval = 1000; // 1 second
  countDownStartAt = 300; // 5 mins
  timeoutCheckInterval = this.foreverInterval;
  isComponentActive = true;
  loginPopupOpen = false;

  constructor(private userService: UserService, private router: Router,
    private producMenuService: ProducMenuService,
    private messagingService: MessagingService,
    private dialog: MatDialog) {
    this.handleUserChange();
    this.userService.restoreLoggedInUser();
    this.registerRouteChangeHandle();
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  handleUserChange() {
    this.userService.loggedInUser
    .pipe(takeWhile(() => this.isComponentActive))
    .subscribe(u => {
      if (u) {
        this.timeoutCheckInterval = this.standardInterval;
        this.notifyTimoutApproaching();
      } else {
        this.timeoutCheckInterval = this.foreverInterval;
      }
    });
  }

  registerRouteChangeHandle() {
    this.router.events
    .pipe(takeWhile(() => this.isComponentActive))
    .subscribe(r => {
      if (r instanceof NavigationEnd && this.router.url !='/error') {
        this.messagingService.hideError();
        this.dialog.closeAll();
        if (this.router.url !='/login' && !this.userService.loggedInUser.value) {
          this.router.navigateByUrl('/login');
        }
        if ((this.router.url =='/login' || this.router.url =='/' ) && this.userService.loggedInUser.value) {
          this.producMenuService.loadProductMenu();
          this.router.navigateByUrl('/home');
        }
      }
    })
  }

  notifyTimoutApproaching() {
    if (this.userService.loadUpdatedLoginInfo()) {
      this.timeoutCheckInterval = this.standardInterval;
      this.dialog.closeAll();
    }
    setTimeout(() => {
      if (this.userService.loggedInUser.value) {
        const dt_now = Date.now();
        const dt_expiry = new Date(this.userService.loggedInUser.value.expiry).getTime();
        const diffTime = dt_expiry - dt_now;
        const diffSeconds = Math.ceil(diffTime / 1000);
        this.userService.secondsRemaining.next(diffSeconds);
        if (diffSeconds < 0) {
          this.userService.logoutUser()
          .pipe(takeWhile(() => this.isComponentActive))
          .subscribe(res => {
            this.timeoutCheckInterval = this.foreverInterval;
          });
        } else if (diffSeconds <= this.countDownStartAt) {
          this.openDialog();
          this.timeoutCheckInterval = this.countDownInterval;
        }
      }
      this.notifyTimoutApproaching();
    },this.timeoutCheckInterval)
  }

  openDialog(): void {
    if (this.loginPopupOpen) {
      return;
    }
    this.loginPopupOpen = true;
    const dialogRef = this.dialog.open(PagePopupComponent, {
      width: "600px",
      data: {
        bodyComponent: LoginComponent,
        bodyComponentInputs: { redirectOnLogin: false, loadForm: LoginPageForm.countdownForm }
      }
    });

    dialogRef.afterClosed().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(result => {
      this.loginPopupOpen = false;
    });
  }

}
