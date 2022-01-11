import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeHistoryComponent } from './components/change-history/change-history.component';
import { MenuChangeHistoryComponent } from './components/menu-change-history/menu-change-history.component';
import { PageControlChangeHistoryComponent } from './components/page-control-change-history/page-control-change-history.component';
import { CoreModule } from '../core/core.module';
import { MenuActionComponent } from './components/menu-action/menu-action.component';



@NgModule({
  declarations: [ChangeHistoryComponent, MenuChangeHistoryComponent, PageControlChangeHistoryComponent, MenuActionComponent],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [ChangeHistoryComponent, MenuChangeHistoryComponent, PageControlChangeHistoryComponent, MenuActionComponent]
})
export class ChangeHistoryModule { }
