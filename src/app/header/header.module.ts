import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ProductMainMenuComponent } from './components/product-main-menu/product-main-menu.component';
import { AddProductMenuComponent } from './components/product-main-menu/add-product-menu/add-product-menu.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [ProductHeaderComponent, ProductMainMenuComponent, AddProductMenuComponent],
  imports: [
    CommonModule,
    CoreModule,
    LoadingBarHttpClientModule
  ],
  exports: [ProductHeaderComponent, ProductMainMenuComponent, AddProductMenuComponent]
})
export class HeaderModule { }
