import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IActionResult } from '../interfaces/ActionResult';
import { IPageControl } from '../interfaces/PageControl';
import { IPageControlAction } from '../interfaces/PageControlAction';
import { ButtonControl, ContainerControl, TextBoxControl } from '../modles/controls';
import { buttonDirectoryObj, containerDirectoryObj, textBoxDirectoryObj } from '../modles/directory';
import { CoreResources } from '../utilities/resources';
import { HttpWrapperService } from './http-wrapper.service';
import { MessagingService } from './messaging.service';
import { ProducMenuService } from './produc-menu.service';

@Injectable({
  providedIn: 'root'
})
export class PageDesignerService {

  public designerMode = new BehaviorSubject<boolean>(true);
  public containers = new BehaviorSubject<ContainerControl[]>([]);
  public selectedControl = new BehaviorSubject<IPageControl>(null);
  public flatControl: IPageControl[];
  public pageControlAction: IPageControlAction[] = [];
  private controlCountTracker = {};
  private controlsFromDB: IPageControl[];
  private selectedMenu: string;

  constructor(private httpService: HttpWrapperService, private producMenuService: ProducMenuService, private messagingService: MessagingService) {
    this.producMenuService.selectedMenu.subscribe(menu => {
      if (this.pageControlAction.length > 0 && this.pageControlAction[0].ControlItem.menuId != this.producMenuService.selectedMenuId) {
        this.producMenuService.selectMenu(this.selectedMenu);
        this.messagingService.showSnackBar({
          completed: false,
          message: 'Save control changes before changing menu'
        });
      } else if (!this.selectedMenu || this.selectedMenu != menu) {
        this.selectedMenu = menu;
        this.controlCountTracker = {};
        this.pageControlAction = [];
        this.selectedControl.next(null);
        this.loadPageControls(this.producMenuService.selectedMenuId);
      }
    });
  }

  loadPageControls(selectedMenuId: string) {
    this.containers.next([]);
    if (selectedMenuId) {
      this.getFormControlsFromDB(selectedMenuId).subscribe(res => {
        this.flatControl = res;
        if (res) {
          this.converFlatControlsToNested(res);
        } else {
          this.loadDefaultContainer();
        }
      });
    }
  }

  converFlatControlsToNested(flatControls: IPageControl[]): void {
    let parentControls: IPageControl[] = flatControls.filter(fc => !fc.parentControlId);
    if (!parentControls || parentControls.length === 0) {
      return;
    }
    parentControls.forEach(pc => {
      pc.children = this.getChildren(pc, flatControls);
    });
    this.containers.next(parentControls);
    if (parentControls.length > 0) {
      this.selectControl(parentControls[0]);
    }
  }

  private getChildren(node: IPageControl, flatMenu: IPageControl[]): IPageControl[] {
    let children: IPageControl[] = flatMenu.filter(m => m.parentControlId === node.controlId);
    if (children && children.length > 0) {
      children.forEach(c => {
        c.children = this.getChildren(c, flatMenu);
      });
    }
    return children;
  }

  loadDefaultContainer() {
    this.addPageContainer();
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

  clickSelectControl(event, control: IPageControl, disabled: boolean = false) {
    if (!disabled) {
      event.stopPropagation();
      this.selectControl(control);
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
    while (this.ifExistsFromDB(newName)) {
      newName = this.getNewControlName(controlType);
    }
    return newName;
  }

  ifExistsFromDB(name: string): boolean {
    let found = false;
    if (name) {
      found = this.controlsFromDB.findIndex(c => c.controlProperties.controlName === name) >= 0;
    }
    return found;
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

  addPageContainer() {
    if (!this.containers.value) {
      this.containers.next([]);
    }
    const newContainer: ContainerControl = new ContainerControl(null, this.producMenuService.selectedMenuId, null, this.getNewControlName(CoreResources.Controls.container), (this.containers.value.length + 1));
    this.containers.value.push(newContainer);
    this.selectControl(newContainer);
    this.registerAddPageControlAction(newContainer);
  }

  addChildrenControl(control: IPageControl): void {
    if (!this.selectedControl.value.children) {
      this.selectedControl.value.children = [];
    }
    const newControl = this.getControlObjectByType(control.controlProperties.controlType, this.producMenuService.selectedMenuId, this.selectedControl.value.controlProperties.controlId,
      this.getNewControlName(control.controlProperties.controlType), this.selectedControl.value.children.length + 1);
    this.selectedControl.value.children.push(newControl);
    this.selectControl(newControl);
    this.registerAddPageControlAction(newControl);
  }

  deleteControl(controls: IPageControl[]): IActionResult {
    let result: IActionResult = {
      completed: false,
      message: CoreResources.DeleteControlNotFound
    }
    if (this.selectedControl.value) {
      for (let i = 0; i < controls.length; i++) {
        if (!result.completed && controls[i].controlProperties.controlId === this.selectedControl.value.controlProperties.controlId) {
          result.completed = true;
          result.message = CoreResources.DeleteControlSuccessfully;
          this.registerDeletePageControAction(controls[i]);
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

  updateControl(): void {
    const selectedControl = this.selectedControl.value;
    if (selectedControl) {
      this.registerUpdatePageControlAction(this.selectedControl.value);
    }
  }

  hasSimilarProperties(control1: IPageControl, control2: IPageControl): boolean {
    let same = true;
    if (!control1 || !control2) {
      return false;
    }
    Object.keys(control1.controlProperties).forEach(k => {
      if (same && control1.controlProperties[k] != control2.controlProperties[k]) {
        same = false;
      }
    });
    Object.keys(control1.controlEvents).forEach(k => {
      if (same && control1.controlEvents[k] != control2.controlEvents[k]) {
        same = false;
      }
    });
    return same;
  }

  private convertDBControlToObject(item: any): IPageControl {
    let newControl: IPageControl;
    const props = JSON.parse(item['controlProperties']);
    const events = item['controlEvents'] ? JSON.parse(item['controlEvents']) : null;
    switch (props['controlType']) {
      case CoreResources.Controls.container:
        newControl = new ContainerControl(item['controlId'], item['menuId'], item['parentControlId'], props['controlName'], props['order'], props, events);
        break;
      case CoreResources.Controls.textbox:
        newControl = new TextBoxControl(item['controlId'], item['menuId'], item['parentControlId'], props['controlName'], props['order'], props, events); break;
      case CoreResources.Controls.button:
        newControl = new ButtonControl(item['controlId'], item['menuId'], item['parentControlId'], props['controlName'], props['order'], props, events); break;
    }
    return newControl;
  }

  // Control Actions
  private registerPageControlAction(node: IPageControl, action: string, nodeStore?: IPageControl) {
    this.pageControlAction.push({
      ControlItem: node,
      ControlOperation: action,
      StoreControlItem: nodeStore
    });
  }

  private deletePageControlAction(node: IPageControl) {
    const n = this.pageControlAction.findIndex(ma => ma.ControlItem.controlProperties.controlId === node.controlProperties.controlId);
    if (n >= 0) {
      this.pageControlAction.splice(n, 1);
    }
  }

  private registerAddPageControlAction(node: IPageControl) {
    this.registerPageControlAction(node, CoreResources.MenuCrudActions.Add);
  }

  private registerUpdatePageControlAction(node: IPageControl) {
    const controlNode = (this.pageControlAction.find(ma => ma.ControlItem.controlProperties.controlId == node.controlProperties.controlId));
    if (controlNode) {
      // record exists in action list
      if (this.hasSimilarProperties(controlNode.ControlItem, controlNode.StoreControlItem)) {
        // all values are same in node from database and current node hence delete the update action
        this.deletePageControlAction(node);
      } else {
        // update the new object that has been updated
        // do not change action as actions ADD or UPDATE will not change once added in this list
        controlNode.ControlItem = node;
      }
    } else {
      const dbNode = this.controlsFromDB.find(cd => cd.controlId === node.controlId);
      this.registerPageControlAction(node, CoreResources.MenuCrudActions.Update, dbNode);
    }
  }

  private registerDeletePageControAction(node: IPageControl) {
    const isNewNode = (this.pageControlAction.findIndex(ma => ma.ControlItem.controlProperties.controlId == node.controlProperties.controlId && ma.ControlOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deletePageControlAction(node);
    if (!isNewNode) {
      this.registerPageControlAction(node, CoreResources.MenuCrudActions.Delete);
    }
  }

  // APIs

  public getFormControlsFromDB(menuId: string): Observable<IPageControl[]> {
    return this.httpService.getData(CoreResources.PageControlApiUrl.getAllMenuPageControls + '/' + menuId).pipe(
      map((d: any[]) => {
        this.controlsFromDB = [];
        const convertedControls: IPageControl[] = [];
        d.forEach(item => {
          convertedControls.push(this.convertDBControlToObject(item));
        });
        this.controlsFromDB = JSON.parse(JSON.stringify(convertedControls));
        return convertedControls;
      }),
      catchError((err) => {
        return of([])
      })
    );
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: IPageControlAction[] = this.pageControlAction.filter(ma => ma.ControlOperation === CoreResources.MenuCrudActions.Add);
    const updatedRecords: IPageControlAction[] = this.pageControlAction.filter(ma => ma.ControlOperation === CoreResources.MenuCrudActions.Update);
    const deletedRecords: IPageControlAction[] = this.pageControlAction.filter(ma => ma.ControlOperation === CoreResources.MenuCrudActions.Delete);
    let calls: Observable<any>[] = [];
    calls = calls.concat(this.generateApiCalls(addedRecords));
    calls = calls.concat(this.generateApiCalls(updatedRecords));
    calls = calls.concat(this.generateApiCalls(deletedRecords));
    return forkJoin(calls);
  }

  private generateApiCalls(menuActions: IPageControlAction[]): Observable<any>[] {
    const arr: Observable<any>[] = [];
    if (menuActions && menuActions.length > 0) {
      menuActions.forEach(ma => {
        const newItem: any = {
          menuId: ma.ControlItem.menuId,
          controlId: ma.ControlItem.controlId,
          controlProperties: JSON.stringify(ma.ControlItem.controlProperties),
          controlEvents: JSON.stringify(ma.ControlItem.controlEvents),
          parentControlId: ma.ControlItem.parentControlId
        };
        if (ma.ControlOperation === CoreResources.MenuCrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(CoreResources.PageControlApiUrl.addMenuPageControls, newItem));
        } else if (ma.ControlOperation === CoreResources.MenuCrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(CoreResources.PageControlApiUrl.updateMenuPageControls + '/' + newItem.controlId, newItem));
        } else if (ma.ControlOperation === CoreResources.MenuCrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(CoreResources.PageControlApiUrl.deleteMenuPageControls + '/' + newItem.controlId));
        }
      });
    }
    return arr;
  }
}
