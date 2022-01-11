import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeHistoryComponent } from './components/change-history/change-history.component';
import { MenuChangeHistoryComponent } from './components/menu-change-history/menu-change-history.component';
import { PageControlChangeHistoryComponent } from './components/page-control-change-history/page-control-change-history.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [ChangeHistoryComponent, MenuChangeHistoryComponent, PageControlChangeHistoryComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [ChangeHistoryComponent, MenuChangeHistoryComponent, PageControlChangeHistoryComponent]
})
export class ChangeHistoryModule { }
