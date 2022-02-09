import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@core/shared/services/user.service';
import { ProducMenuService } from '@header/shared/services/product-menu.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loadForm = 0; // 0 for login, 1 for register, 2 for forgot password
  pageForm: FormGroup;
  hide = true;
  isComponentActive = true
  constructor(private userService: UserService, private router: Router, private producMenuService: ProducMenuService) { }

  ngOnInit(): void {
    this.configureForm(0);
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  configureForm(form: number) {
    this.loadForm = form;
    switch (form) {
      case 0: this.configureLoginForm(); break;
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
        loginActive = false;
        // res.token = this._cookieService.get('token');
        this.userService.setLoggedInUser(res);
        this.producMenuService.loadProductMenu();
        this.router.navigateByUrl('/home');
      });
    }
  }

}
