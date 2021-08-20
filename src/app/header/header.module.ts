import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHeaderComponent } from './product-header/product-header.component';
import { MainMenuModule } from '../main-menu/main-menu.module';
import { CoreModule } from '../core/core.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';


@NgModule({
  declarations: [ProductHeaderComponent],
  imports: [
    CommonModule,
    CoreModule,
    MainMenuModule,
    LoadingBarHttpClientModule
  ],
  exports: [ProductHeaderComponent]
})
export class HeaderModule { }
