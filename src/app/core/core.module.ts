import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './components/layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecordActionComponent } from './components/record-action/record-action.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ChangeHistoryComponent } from './components/change-history/change-history.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuChangeHistoryComponent } from './components/menu-change-history/menu-change-history.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuActionComponent } from './components/menu-action/menu-action.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [LayoutComponent, RecordActionComponent, SnackBarComponent, ConfirmationComponent, SiteMapComponent,
    ChangeHistoryComponent, MenuChangeHistoryComponent, MenuActionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTreeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTooltipModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  exports: [
    MatToolbarModule,
    HttpClientModule,
    ChangeHistoryComponent,
    MatIconModule,
    LayoutComponent,
    RecordActionComponent,
    SiteMapComponent,
    MatMenuModule,
    MatButtonModule,
    MatTreeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatTooltipModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule
  ]
})
export class CoreModule { }
