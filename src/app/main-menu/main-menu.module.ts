import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductMainMenuComponent } from './product-main-menu/product-main-menu.component';
import { CoreModule } from '../core/core.module';
import { AddProductMenuComponent } from './add-product-menu/add-product-menu.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductMainMenuComponent, AddProductMenuComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  exports: [ProductMainMenuComponent]
})
export class MainMenuModule { }
