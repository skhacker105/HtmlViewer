import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PageModule } from './page/page.module';
import { OrganizationModule } from './organization/organization.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule,
    PageModule,
    OrganizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
