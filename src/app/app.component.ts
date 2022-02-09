import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '@core/shared/services/user.service';
import { ProducMenuService } from '@header/shared/services/product-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HTMLView';

  constructor(private userService: UserService, private router: Router, private producMenuService: ProducMenuService) {
    this.userService.restoreLoggedInUser();
    this.registerRouteChangeHandle();
  }

  registerRouteChangeHandle() {
    this.router.events.subscribe(r => {
      if (r instanceof NavigationEnd && this.router.url !='/error') {
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

  onClick() {
    this.router.navigateByUrl('/home');
  }
}
