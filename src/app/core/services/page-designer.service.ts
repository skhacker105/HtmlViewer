import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IActionResult } from '../interfaces/ActionResult';
import { IPageControl } from '../interfaces/PageControl';
import { ContainerControl } from '../modles/controls';
import { buttonDirectoryObj, containerDirectoryObj, textBoxDirectoryObj } from '../modles/directory';
import { CoreResources } from '../utilities/resources';
import { ProducMenuService } from './produc-menu.service';

@Injectable({
  providedIn: 'root'
})
export class PageDesignerService {

  public designerMode = new BehaviorSubject<boolean>(true);
  public containers = new BehaviorSubject<ContainerControl[]>([]);
  public selectedControl = new BehaviorSubject<IPageControl>(null);
  private controlCountTracker = {};

  constructor(private producMenuService: ProducMenuService) {
  }

  selectControl(control: IPageControl) {
    if (this.selectedControl.value) {
      this.selectedControl.value.selected = false;
    }
    this.selectedControl.next(control);
    if (control) {
      this.selectedControl.value.selected = true;
    }
  }

  setDesignerMode(mode: boolean) {
    this.designerMode.next(mode);
  }

  getNewControlName(controlType: string): string {
    let newName = controlType.charAt(0).toUpperCase() + controlType.slice(1);
    if (controlType in this.controlCountTracker) {
      this.controlCountTracker[controlType] = this.controlCountTracker[controlType] + 1;
    } else {
      this.controlCountTracker[controlType] = 1;
    }
    newName = newName + this.controlCountTracker[controlType];
    return newName;
  }

  addPageContainer() {
    if (!this.containers.value) {
      this.containers.next([]);
    }
    const newContainer: ContainerControl = new ContainerControl(this.producMenuService.selectedMenuId, null, this.getNewControlName(CoreResources.Controls.container), (this.containers.value.length + 1));
    this.containers.value.push(newContainer);
    this.selectControl(newContainer);
  }

  getControlObjectByType(controleType: string, menuId: string, parentControlId: string, controlName: string, order: number): IPageControl {
    let control;
    switch (controleType) {
      case CoreResources.Controls.container: control = containerDirectoryObj.getNewInstance(menuId, parentControlId, controlName, order); break;
      case CoreResources.Controls.textbox: control = textBoxDirectoryObj.getNewInstance(menuId, parentControlId, controlName, order); break;
      case CoreResources.Controls.button: control = buttonDirectoryObj.getNewInstance(menuId, parentControlId, controlName, order); break;
    }
    return control;
  }

  addChildrenControl(control: IPageControl) {
    if (!this.selectedControl.value.children) {
      this.selectedControl.value.children = [];
    }
    const newControl = this.getControlObjectByType(control.controlProperties.controlType, this.producMenuService.selectedMenuId, this.selectedControl.value.controlProperties.controlId,
      this.getNewControlName(control.controlProperties.controlType), this.selectedControl.value.children.length + 1);
    this.selectedControl.value.children.push(newControl);
    this.selectControl(newControl);
  }

  clickSelectControl(event, control: IPageControl, disabled: boolean = false) {
    if (!disabled) {
      event.stopPropagation();
      this.selectControl(control);
    }
  }

  deleteControl(controls: IPageControl[]): IActionResult {
    let result: IActionResult = {
      completed: false,
      message: CoreResources.DeleteControlNotFound
    }
    if (this.selectedControl.value) {
      for (let i = 0; i < controls.length; i++) {
        if (controls[i].controlProperties.controlId === this.selectedControl.value.controlProperties.controlId) {
          result.completed = true;
          result.message = CoreResources.DeleteControlSuccessfully;
          controls.splice(i, 1);
          if (this.containers.value) {
            if (this.containers.value.length > 0) {
              this.selectControl(this.containers.value[0]);
            } else {
              this.selectControl(null);
            }
          }
        }
        if (!result.completed && controls[i].children) {
          result = this.deleteControl(controls[i].children);
        }
      }
    }
    return result;
  }

  hasChildControl() { }
}
