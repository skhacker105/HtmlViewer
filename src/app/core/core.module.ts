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
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuActionComponent } from '../change-history/components/menu-action/menu-action.component';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [LayoutComponent, RecordActionComponent, SnackBarComponent, ConfirmationComponent, SiteMapComponent],
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
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBottomSheetModule
  ],
  exports: [
    MatToolbarModule,
    HttpClientModule,
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
    MatSelectModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    SnackBarComponent,
    ConfirmationComponent
  ]
})
export class CoreModule { }
