import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { LoginPageForm } from '@core/utilities/enumerations';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  forms = LoginPageForm;
  @Input() redirectOnLogin = true;
  @Input() loadForm = this.forms.loginForm; // 0 for login, 1 for register, 2 for forgot password 3 for countdown
  @Output() processComplete = new EventEmitter<any>();
  pageForm: FormGroup;
  hide = true;
  isComponentActive = true
  timeRemaining = '';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.configureForm();
    this.userService.secondsRemaining.subscribe(s => {
      this.calculateRemainingTime(s);
    });
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  calculateRemainingTime(s: number): void {
    if ((!s && s != 0) || s < 0) {
      return;
    }
    var hrs = ~~(s / 3600);
    var mins = ~~((s % 3600) / 60);
    var secs = ~~s % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + (hrs > 1 ? ' hours ' : ' hour ');
    }

    if (mins > 0) {
      ret += "" + mins + (mins > 1 ? ' minutes ' : ' minute ');
    }
    ret += "" + secs + (secs > 1 ? ' seconds ' : ' second ');
    this.timeRemaining = ret;
  }

  configureForm() {
    switch (this.forms.loginForm) {
      case this.forms.loginForm: this.configureLoginForm(); break;
    }
  }

  configureLoginForm() {
    this.pageForm = new FormGroup({
      userName: new FormControl(
        '',
        Validators.required
      ),
      password: new FormControl(
        '',
        Validators.required
      )
    });
  }

  onClearClick() {
    this.pageForm.reset();
  }

  clearControl(controlName) {
    const data = {};
    data[controlName] = '';
    this.pageForm.patchValue(data);
  }

  login() {
    let loginActive = true;
    if (this.pageForm.valid) {
      Object.keys(this.pageForm.controls).forEach(field => {
        const control = this.pageForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      this.userService.loginUser(this.pageForm.controls['userName'].value, this.pageForm.controls['password'].value)
      .pipe(takeWhile(() => loginActive))
      .subscribe(res => {
        if (res) {
          loginActive = false;
          if (this.redirectOnLogin) {
            this.router.navigateByUrl('/home');
          } else {
            this.processComplete.emit();
          }
        }
      });
    }
  }

}
