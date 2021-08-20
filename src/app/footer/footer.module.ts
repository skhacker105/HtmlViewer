import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFooterComponent } from './product-footer/product-footer.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [ProductFooterComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [ProductFooterComponent]
})
export class FooterModule { }
