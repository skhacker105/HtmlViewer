import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageModule } from './page/page.module';
import { OrganizationModule } from './organization/organization.module';
import { ChangeHistoryModule } from './change-history/change-history.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpCallInterceptorsInterceptor } from '@core/interceptors/http-call-interceptors.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule,
    PageModule,
    OrganizationModule,
    ChangeHistoryModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: HttpCallInterceptorsInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
