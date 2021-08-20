import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from './components/controls/pageControls/container/container.component';
import { TextBoxComponent } from './components/controls/pageControls/text-box/text-box.component';
import { ControlRenderComponent } from './components/controls/control-render/control-render.component';
import { DirectoryViewComponent } from './components/controls/directory-view/directory-view.component';
import { PropertyViewComponent } from './components/controls/property-view/property-view.component';
import { ButtonComponent } from './components/controls/pageControls/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    ContainerComponent,
    TextBoxComponent,
    ControlRenderComponent,
    DirectoryViewComponent,
    PropertyViewComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
