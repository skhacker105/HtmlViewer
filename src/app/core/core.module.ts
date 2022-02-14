import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecordActionComponent } from './components/record-action/record-action.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { SiteMapComponent } from './components/site-map/site-map.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PagePopupComponent } from './components/page-popup/page-popup.component';
import { MatDividerModule } from '@angular/material/divider';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [RecordActionComponent, ConfirmationComponent, SiteMapComponent,
  LoginComponent, ErrorComponent, LayoutComponent, PagePopupComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
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
    MatBottomSheetModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule
  ],
  exports: [
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
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
    ConfirmationComponent,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    LoginComponent, ErrorComponent, LayoutComponent
  ]
})
export class CoreModule { }
