import { Injectable } from "@angular/core";
import { IActionResult } from "@core/shared/interfaces/ActionResult";
import { HttpWrapperService } from "@core/shared/services/http-wrapper.service";
import { Observable, of, forkJoin } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { IRoleAction } from "../interfaces/OrganizationActions";
import { IRoles } from "../interfaces/Roles";
import { Roles } from "../models/roles";
import { OriganizationResources } from "../utilities/organization-resources";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public parentRoles: IRoles[] = [new Roles('000', 'Organisation', null)];
  public RolesAction: IRoleAction[] = [];
  public flatRoles: IRoles[];

  constructor(private httpService: HttpWrapperService) {
  }

  getRoleParentByRoleId(roleArray: Roles[], roleId: string): IRoles {
    let result: IRoles;
    if (roleArray) {
      roleArray.forEach(ta => {
        if (!result && ta.children.findIndex(t => t.Id === roleId) >= 0) {
          result = ta;
        } else if (!result && ta.children) {
          result = this.getRoleParentByRoleId(ta.children, roleId);
        }
      });
    }
    return result;
  }

  addrole(roleName: string, roleId?: string, parentrole?: IRoles) {
    let result: IActionResult = {
      completed: false
    };
    if (!parentrole) {
      // add role as parent role
      this.parentRoles.push(new Roles(roleId, roleName, null));
      result.completed = true;
    } else {
      result = parentrole.addChild(roleId, roleName);
    }
    return result;
  }

  converFlatRolesToNested(flatRoles: IRoles[]): void {
    this.parentRoles[0].children = this.getChildren(this.parentRoles[0], flatRoles);
  }

  private getChildren(node: IRoles, flatMenu: IRoles[]): IRoles[] {
    let children: IRoles[] = [];
    children = flatMenu.filter(m => m.parentId === node.Id);
    if (children && children.length > 0) {
      children.forEach(c => {
        c.children = this.getChildren(c, flatMenu);
      });
    }
    return children;
  }

  // Roles Actions
  private registerRolesAction(node: IRoles, action: string) {
    this.RolesAction.push({
      RoleItem: node,
      RoleOperation: action
    });
  }

  private deleteRolesAction(node: IRoles) {
    const n = this.RolesAction.findIndex(ta => ta.RoleItem.Id === node.Id);
    if (n >= 0) {
      this.RolesAction.splice(n, 1);
    }
  }

  public registerAddRolesAction(node: IRoles) {
    this.registerRolesAction(node, OriganizationResources.CrudActions.Add);
  }

  public registerUpdateRolesAction(node: IRoles) {
    const isNewNode = (this.RolesAction.findIndex(ta => ta.RoleItem.Id === node.Id && ta.RoleOperation === OriganizationResources.CrudActions.Add) >= 0);
    this.deleteRolesAction(node);
    if (!isNewNode) {
      this.registerRolesAction(node, OriganizationResources.CrudActions.Update);
    } else {
      this.registerRolesAction(node, OriganizationResources.CrudActions.Add);
    }
  }

  public registerDeleteRolesAction(node: IRoles) {
    const isNewNode = (this.RolesAction.findIndex(ta => ta.RoleItem.Id === node.Id && ta.RoleOperation === OriganizationResources.CrudActions.Add) >= 0);
    this.deleteRolesAction(node);
    if (!isNewNode) {
      this.registerRolesAction(node, OriganizationResources.CrudActions.Delete);
    }
  }

  // APIs

  public getRoles(): Observable<IRoles[]> {
    return this.httpService.getData(OriganizationResources.RoleApiUrl.getAllRoles).pipe(
      map((d: any[]) => {
        const convertedControls: IRoles[] = [];
        d.forEach(item => {
          convertedControls.push(new Roles(item['roleId'], item['roleName'], item['parentRoleId']));
        });
        this.flatRoles = JSON.parse(JSON.stringify(convertedControls));
        return convertedControls;
      }),
      catchError((err) => {
        return of([])
      })
    );
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: IRoleAction[] = this.RolesAction.filter(ma => ma.RoleOperation === OriganizationResources.CrudActions.Add);
    const updatedRecords: IRoleAction[] = this.RolesAction.filter(ma => ma.RoleOperation === OriganizationResources.CrudActions.Update);
    const deletedRecords: IRoleAction[] = this.RolesAction.filter(ma => ma.RoleOperation === OriganizationResources.CrudActions.Delete);
    let calls: Observable<any>[] = [];
    calls = calls.concat(this.generateApiCalls(addedRecords));
    calls = calls.concat(this.generateApiCalls(updatedRecords));
    calls = calls.concat(this.generateApiCalls(deletedRecords));
    return forkJoin(calls);
  }

  private generateApiCalls(roleActions: IRoleAction[]): Observable<any>[] {
    const arr: Observable<any>[] = [];
    if (roleActions && roleActions.length > 0) {
      roleActions.forEach(ma => {
        const newItem: any = {
          roleId: ma.RoleItem.Id,
          roleName: ma.RoleItem.name,
          parentRoleId: ma.RoleItem.parentId
        };
        if (ma.RoleOperation === OriganizationResources.CrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(OriganizationResources.RoleApiUrl.addRole, newItem));
        } else if (ma.RoleOperation === OriganizationResources.CrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(OriganizationResources.RoleApiUrl.updateRole + newItem.roleId, newItem));
        } else if (ma.RoleOperation === OriganizationResources.CrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(OriganizationResources.RoleApiUrl.deleteTRole + newItem.roleId));
        }
      });
    }
    return arr;
  }
}
