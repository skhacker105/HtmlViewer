import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreModule } from "../core/core.module";
import { ControlRenderComponent } from "./components/designer-panel/control-render/control-render.component";
import { DirectoryViewComponent } from "./components/designer-panel/directory-view/directory-view.component";
import { EventViewComponent } from "./components/designer-panel/event-view/event-view.component";
import { InputOutputComponent } from "./components/designer-panel/input-output/input-output.component";
import { InputComponent } from "./components/designer-panel/input-output/input/input.component";
import { OutputComponent } from "./components/designer-panel/input-output/output/output.component";
import { PropertyViewComponent } from "./components/designer-panel/property-view/property-view.component";
import { ButtonComponent } from "./components/page-controls/button/button.component";
import { ContainerComponent } from "./components/page-controls/container/container.component";
import { TextBoxComponent } from "./components/page-controls/text-box/text-box.component";
import { ProductPageComponent } from "./components/product-page/product-page.component";



@NgModule({
  declarations: [
    ProductPageComponent,
    ContainerComponent,
    TextBoxComponent,
    ControlRenderComponent,
    DirectoryViewComponent,
    PropertyViewComponent,
    ButtonComponent,
    EventViewComponent,
    InputOutputComponent,
    InputComponent,
    OutputComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    ProductPageComponent,
    ContainerComponent,
    TextBoxComponent,
    ControlRenderComponent,
    DirectoryViewComponent,
    PropertyViewComponent,
    ButtonComponent,
    EventViewComponent,
    InputOutputComponent,
    InputComponent,
    OutputComponent]
})
export class PageModule { }
