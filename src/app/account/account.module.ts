import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';



@NgModule({
  declarations: [
    AccountMenuComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class AccountModule { }
