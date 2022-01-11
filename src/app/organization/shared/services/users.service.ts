import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserAction } from '../interfaces/OrganizationActions';
import { Users } from '../models/users';
import { HttpWrapperService } from '../../../core/shared/services/http-wrapper.service';
import { RolesService } from './roles.service';
import { TeamsService } from './teams.service';
import { IUser } from '../interfaces/Users';
import { OriganizationResources } from '../utilities/organization-resources';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public users: IUser[];
  public userActions: IUserAction[] = [];

  constructor(
    private rolesService: RolesService,
    private teamsService: TeamsService,
    private httpService: HttpWrapperService
  ) { }

  loadAllTeamUserRoles() {
    if (!this.teamsService.parentTeams[0].children || this.teamsService.parentTeams[0].children.length === 0) {
      this.teamsService.getTeams().subscribe(res => {
        this.teamsService.converFlatTeamsToNested(res);
      });
    }
    if (!this.rolesService.parentRoles[0].children || this.rolesService.parentRoles[0].children.length === 0) {
      this.rolesService.getRoles().subscribe(res => {
        this.rolesService.converFlatRolesToNested(res);
      });
    }
  }

  // User Actions
  private registerUserAction(node: IUser, action: string) {
    this.userActions.push({
      UserItem: node,
      UserOperation: action
    });
  }

  private deleteUserAction(node: IUser) {
    const n = this.userActions.findIndex(ta => ta.UserItem.userId === node.userId);
    if (n >= 0) {
      this.userActions.splice(n, 1);
    }
  }

  public registerAddUserAction(node: IUser) {
    this.registerUserAction(node, OriganizationResources.CrudActions.Add);
  }

  public registerUpdateUserAction(node: IUser) {
    const isNewNode = (this.userActions.findIndex(ta => ta.UserItem.userId === node.userId && ta.UserOperation === OriganizationResources.CrudActions.Add) >= 0);
    this.deleteUserAction(node);
    if (!isNewNode) {
      this.registerUserAction(node, OriganizationResources.CrudActions.Update);
    } else {
      this.registerUserAction(node, OriganizationResources.CrudActions.Add);
    }
  }

  public registerDeleteUserAction(node: IUser) {
    const isNewNode = (this.userActions.findIndex(ta => ta.UserItem.userId === node.userId && ta.UserOperation === OriganizationResources.CrudActions.Add) >= 0);
    this.deleteUserAction(node);
    if (!isNewNode) {
      this.registerUserAction(node, OriganizationResources.CrudActions.Delete);
    }
  }

  // APIs
  public getUsers(): Observable<IUser[]> {
    return this.httpService.getData(OriganizationResources.UserApiUrl.getAllUsers).pipe(
      map((d: any[]) => {
        const convertedUsers: IUser[] = [];
        d.forEach(item => {
        //   convertedControls.push(new Teams(item['teamId'], item['teamName'], item['parentTeamId']));
        convertedUsers.push(new Users(item['userId'], item['userName'], item['roleId'], item['teamIds']))
        });
        return convertedUsers;
      }),
      catchError((err) => {
        return of([])
      })
    );
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: IUserAction[] = this.userActions.filter(ma => ma.UserOperation === OriganizationResources.CrudActions.Add);
    const updatedRecords: IUserAction[] = this.userActions.filter(ma => ma.UserOperation === OriganizationResources.CrudActions.Update);
    const deletedRecords: IUserAction[] = this.userActions.filter(ma => ma.UserOperation === OriganizationResources.CrudActions.Delete);
    let calls: Observable<any>[] = [];
    calls = calls.concat(this.generateApiCalls(addedRecords));
    calls = calls.concat(this.generateApiCalls(updatedRecords));
    calls = calls.concat(this.generateApiCalls(deletedRecords));
    return forkJoin(calls);
  }

  private generateApiCalls(teamActions: IUserAction[]): Observable<any>[] {
    const arr: Observable<any>[] = [];
    if (teamActions && teamActions.length > 0) {
      teamActions.forEach(ma => {
        const newItem: any = {
          userId: ma.UserItem.userId,
          userName: ma.UserItem.userName,
          roleId: ma.UserItem.roleId,
          teamIds: ma.UserItem.teamIds.join(',')
        };
        if (ma.UserOperation === OriganizationResources.CrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(OriganizationResources.UserApiUrl.addUser, newItem));
        } else if (ma.UserOperation === OriganizationResources.CrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(OriganizationResources.UserApiUrl.updateUser + '/' + newItem.userId, newItem));
        } else if (ma.UserOperation === OriganizationResources.CrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(OriganizationResources.UserApiUrl.deleteUser + '/' + newItem.userId));
        }
      });
    }
    return arr;
  }
}
