import { Injectable } from "@angular/core";
import { IMenuAction } from "@change-history/shared/models/MenuActions";
import { IActionResult } from "@core/shared/interfaces/ActionResult";
import { HttpWrapperService } from "@core/shared/services/http-wrapper.service";
import { MessagingService } from "@core/shared/services/messaging.service";
import { CoreHelper } from "@core/shared/utilities/helper";
import { CoreResources } from "@core/shared/utilities/resources";
import { PageIOService } from "@page/shared/services/page-io.service";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { IProductMenuItem } from "../interfaces/ProductMenuItem";
import { HeaderResources } from "../utilities/header-resources";

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
    MenuOperation: CoreResources.CrudActions.Add
  }];
  selectedMenu = new BehaviorSubject<string>(null);
  selectedMenuId: string;
  flatMenu: IProductMenuItem[];

  constructor(private httpService: HttpWrapperService, private messagingService: MessagingService, private pageIOService: PageIOService) { }

  selectMenu(menu: string) {
    if (this.menuActions.length > 0 || this.pageIOService.ioActions.length > 0) {
      this.messagingService.showSnackBar({
        completed: false,
        message: HeaderResources.MenuChangeSaveError
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

  loadProductMenu(callBack?: {(response): void}): any {
    this.getMenuFromDB().subscribe(res => {
      if (res) {
        this.flatMenu = res;
        if (res.length > 0) {
          this.converFlatMenuToNested(res);
          this.menuActions = [];
          this.selectMenu(this.ProductMenuList[0].name);
          return {
            then: () => {
              if (callBack) {
                callBack(res);
              }
            }
          };
        } else {
          return {
            then: () => {}
          };
        }
      }
    });
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
        message: HeaderResources.MenuAlreadyExists
      };
    } else {
      const parentNode = this.findNode(this.ProductMenuList, parentName);
      if (!parentNode) {
        // dont add if parent node is not found
        return {
          completed: false,
          message: HeaderResources.ParentNodeNotFound
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
          message: HeaderResources.MenuAdded
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
        message: HeaderResources.MenuNotFound
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
        message: HeaderResources.MenuDeleteSuccess
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
        message: HeaderResources.NodeUpdateSuccess
      };
    } else {
      return {
        completed: false,
        message: HeaderResources.MenuUpdateFail_AlreadyExists
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
    this.registerMenuAction(node, CoreResources.CrudActions.Add);
  }

  private registerUpdateMenuAction(node: IProductMenuItem) {
    const isNewNode = (this.menuActions.findIndex(ma => ma.MenuItem.Id == node.Id && ma.MenuOperation === CoreResources.CrudActions.Add) >= 0);
    this.deleteRegisteredMenuAction(node);
    if (!isNewNode) {
      this.registerMenuAction(node, CoreResources.CrudActions.Update);
    } else {
      this.registerMenuAction(node, CoreResources.CrudActions.Add);
    }
  }

  private registerDeleteMenuAction(node: IProductMenuItem) {
    const isNewNode = (this.menuActions.findIndex(ma => ma.MenuItem.Id == node.Id && ma.MenuOperation === CoreResources.CrudActions.Add) >= 0);
    this.deleteRegisteredMenuAction(node);
    if (!isNewNode) {
      this.registerMenuAction(node, CoreResources.CrudActions.Delete);
    }
  }

  // APIs

  public getMenuFromDB(): Observable<IProductMenuItem[]> {
    return this.httpService.getData(HeaderResources.MenuApiUrl.getAllMenu);
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: IMenuAction[] = this.menuActions.filter(ma => ma.MenuOperation === CoreResources.CrudActions.Add);
    const updatedRecords: IMenuAction[] = this.menuActions.filter(ma => ma.MenuOperation === CoreResources.CrudActions.Update);
    const deletedRecords: IMenuAction[] = this.menuActions.filter(ma => ma.MenuOperation === CoreResources.CrudActions.Delete);
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
        if (ma.MenuOperation === CoreResources.CrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(HeaderResources.MenuApiUrl.addMenu, newItem));
        } else if (ma.MenuOperation === CoreResources.CrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(HeaderResources.MenuApiUrl.updateMenu + newItem.Id, newItem));
        } else if (ma.MenuOperation === CoreResources.CrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(HeaderResources.MenuApiUrl.deleteMenu + newItem.Id));
        }
      });
    }
    return arr;
  }
}
