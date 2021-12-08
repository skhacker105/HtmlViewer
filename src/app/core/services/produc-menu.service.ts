import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { IActionResult } from '../interfaces/ActionResult';
import { IMenuAction } from '../interfaces/MenuActions';
import { IProductMenuItem } from '../interfaces/ProductMenuItem';
import { CoreHelper } from '../utilities/helper';
import { CoreResources } from '../utilities/resources';
import { HttpWrapperService } from './http-wrapper.service';
import { MessagingService } from './messaging.service';
import { PageDesignerService } from './page-designer.service';
import { PageIOService } from './page-io.service';

@Injectable({
  providedIn: 'root'
})
export class ProducMenuService {

  public ProductMenuList: IProductMenuItem[] = [{
    Id: '000',
    name: 'ROOT',
    order: 0,
    parent: null,
    expanded: true
  }];
  public menuActions: IMenuAction[] = [{
    MenuItem: this.ProductMenuList[0],
    MenuOperation: CoreResources.MenuCrudActions.Add
  }];
  selectedMenu = new BehaviorSubject<string>(null);
  selectedMenuId: string;
  flatMenu: IProductMenuItem[];

  constructor(private httpService: HttpWrapperService, private messagingService: MessagingService, private pageIOService: PageIOService) { }

  selectMenu(menu: string) {
    if (this.menuActions.length > 0 || this.pageIOService.ioActions.length > 0) {
      this.messagingService.showSnackBar({
        completed: false,
        message: CoreResources.MenuChangeSaveError
      });
      return;
    }
    if (menu) {
      const menuNode = this.findNode(this.ProductMenuList, menu);
      this.selectedMenuId = menuNode.Id;
      this.selectedMenu.next(menu);
      this.pageIOService.loadPageIO(menuNode.Id);
    }
  }

  converFlatMenuToNested(flatMenu: IProductMenuItem[]): void {
    this.ProductMenuList = [flatMenu[0]];
    this.ProductMenuList[0].children = this.getChildren(this.ProductMenuList[0], flatMenu);
    this.refreshListReference();
  }

  private getChildren(node: IProductMenuItem, flatMenu: IProductMenuItem[]): IProductMenuItem[] {
    let children: IProductMenuItem[] = [];
    children = flatMenu.filter(m => m.parent === node.name);
    if (children && children.length > 0) {
      children.forEach(c => {
        c.children = this.getChildren(c, flatMenu);
      });
    }
    return children;
  }

  public addChildNode(parentName: string, newNodeName: string): IActionResult {
    if (this.findNode(this.ProductMenuList, newNodeName)) {
      // dont add if node already exists
      return {
        completed: false,
        message: CoreResources.MenuAlreadyExists
      };
    } else {
      const parentNode = this.findNode(this.ProductMenuList, parentName);
      if (!parentNode) {
        // dont add if parent node is not found
        return {
          completed: false,
          message: CoreResources.ParentNodeNotFound
        }
      } else {
        // add node to parent node
        if (!parentNode.children) {
          parentNode.children = [];
        }
        const nextChildIndex = parentNode.children.length;
        const newNode: IProductMenuItem = {
          Id: CoreHelper.generateId(),
          name: newNodeName,
          order: nextChildIndex,
          parent: parentName,
          expanded: true
        };
        this.registerAddMenuAction(newNode);
        parentNode.children.push(newNode);
        // refresh instance of menu
        this.refreshListReference();
        return {
          completed: true,
          message: CoreResources.MenuAdded
        }
      }
    }
  }

  public deleteMenu(menu: string): IActionResult {
    const node = this.findNode(this.ProductMenuList, menu);
    if (!node) {
      // if no node found raise error
      return {
        completed: false,
        message: CoreResources.MenuNotFound
      };
    } else {
      // delete all children if exists for current node
      if (node.children && node.children.length > 0) {
        node.children.forEach(c => {
          this.deleteMenu(c.name);
        });
      }

      // delete if node found
      const parent = this.findNode(this.ProductMenuList, node.parent);
      parent.children.splice(node.order, 1);
      this.registerDeleteMenuAction(node);

      // update all children order numbers
      for (let i = 0; i < parent.children.length; i++) {
        parent.children[i].order = i;
      }
      // refresh instance of menu
      this.refreshListReference();
      return {
        completed: true,
        message: CoreResources.MenuDeleteSuccess
      };
    }
  }

  public updateNode(menu: string, newName: string): IActionResult {
    if (!this.findNode(this.ProductMenuList, newName)) {
      const node = this.findNode(this.ProductMenuList, menu);
      node.name = newName;
      this.registerUpdateMenuAction(node);

      // update parent name for all immediate children
      if (node.children) {
        node.children.forEach(c => {
          c.parent = newName;
          this.registerUpdateMenuAction(c);
        });
      }

      // refresh instance of menu
      this.refreshListReference();
      return {
        completed: true,
        message: CoreResources.NodeUpdateSuccess
      };
    } else {
      return {
        completed: false,
        message: CoreResources.MenuUpdateFail_AlreadyExists
      };
    }
  }

  public findNode(tree: IProductMenuItem[], searchName: string): IProductMenuItem | null | undefined {
    let node;
    // search if tree exists
    if (tree) {
      // search each item in tree
      tree.forEach(item => {
        // search only if not found yet
        if (!node) {
          if (item.name === searchName) {
            // if current item is found as search item
            node = item;
          } else {
            const childResult = this.findNode(item.children, searchName);
            if (childResult) {
              node = childResult;
            }
          }
        }
      });
    }
    return node;
  }

  private refreshListReference(): void {
    this.ProductMenuList = JSON.parse(JSON.stringify(this.ProductMenuList));
  }

  // Menu Actions
  private registerMenuAction(node: IProductMenuItem, action: string) {
    this.menuActions.push({
      MenuItem: node,
      MenuOperation: action
    });
  }

  private deleteRegisteredMenuAction(node: IProductMenuItem) {
    const n = this.menuActions.findIndex(ma => ma.MenuItem.Id === node.Id);
    if (n >= 0) {
      this.menuActions.splice(n, 1);
    }
  }

  private registerAddMenuAction(node: IProductMenuItem) {
    this.registerMenuAction(node, CoreResources.MenuCrudActions.Add);
  }

  private registerUpdateMenuAction(node: IProductMenuItem) {
    const isNewNode = (this.menuActions.findIndex(ma => ma.MenuItem.Id == node.Id && ma.MenuOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deleteRegisteredMenuAction(node);
    if (!isNewNode) {
      this.registerMenuAction(node, CoreResources.MenuCrudActions.Update);
    } else {
      this.registerMenuAction(node, CoreResources.MenuCrudActions.Add);
    }
  }

  private registerDeleteMenuAction(node: IProductMenuItem) {
    const isNewNode = (this.menuActions.findIndex(ma => ma.MenuItem.Id == node.Id && ma.MenuOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deleteRegisteredMenuAction(node);
    if (!isNewNode) {
      this.registerMenuAction(node, CoreResources.MenuCrudActions.Delete);
    }
  }

  // APIs

  public getMenuFromDB(): Observable<IProductMenuItem[]> {
    return this.httpService.getData(CoreResources.MenuApiUrl.getAllMenu);
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: IMenuAction[] = this.menuActions.filter(ma => ma.MenuOperation === CoreResources.MenuCrudActions.Add);
    const updatedRecords: IMenuAction[] = this.menuActions.filter(ma => ma.MenuOperation === CoreResources.MenuCrudActions.Update);
    const deletedRecords: IMenuAction[] = this.menuActions.filter(ma => ma.MenuOperation === CoreResources.MenuCrudActions.Delete);
    let calls: Observable<any>[] = [];
    calls = calls.concat(this.generateApiCalls(addedRecords));
    calls = calls.concat(this.generateApiCalls(updatedRecords));
    calls = calls.concat(this.generateApiCalls(deletedRecords));
    return forkJoin(calls);
  }

  private generateApiCalls(menuActions: IMenuAction[]): Observable<any>[] {
    const arr: Observable<any>[] = [];
    if (menuActions && menuActions.length > 0) {
      menuActions.forEach(ma => {
        const newItem: any = {
          Id: ma.MenuItem.Id,
          name: ma.MenuItem.name,
          order: ma.MenuItem.order,
          parent: ma.MenuItem.parent
        };
        if (ma.MenuOperation === CoreResources.MenuCrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(CoreResources.MenuApiUrl.addMenu, newItem));
        } else if (ma.MenuOperation === CoreResources.MenuCrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(CoreResources.MenuApiUrl.updateMenu + newItem.Id, newItem));
        } else if (ma.MenuOperation === CoreResources.MenuCrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(CoreResources.MenuApiUrl.deleteMenu + newItem.Id));
        }
      });
    }
    return arr;
  }
}
