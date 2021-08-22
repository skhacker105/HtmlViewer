import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUserAction } from '../interfaces/OrganizationActions';
import { IUser } from '../interfaces/Users';
import { Users } from '../modles/users';
import { CoreResources } from '../utilities/resources';
import { HttpWrapperService } from './http-wrapper.service';
import { RolesService } from './roles.service';
import { TeamsService } from './teams.service';

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
    this.registerUserAction(node, CoreResources.MenuCrudActions.Add);
  }

  public registerUpdateUserAction(node: IUser) {
    const isNewNode = (this.userActions.findIndex(ta => ta.UserItem.userId === node.userId && ta.UserOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deleteUserAction(node);
    if (!isNewNode) {
      this.registerUserAction(node, CoreResources.MenuCrudActions.Update);
    } else {
      this.registerUserAction(node, CoreResources.MenuCrudActions.Add);
    }
  }

  public registerDeleteUserAction(node: IUser) {
    const isNewNode = (this.userActions.findIndex(ta => ta.UserItem.userId === node.userId && ta.UserOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deleteUserAction(node);
    if (!isNewNode) {
      this.registerUserAction(node, CoreResources.MenuCrudActions.Delete);
    }
  }

  // APIs
  public getUsers(): Observable<IUser[]> {
    return this.httpService.getData(CoreResources.UserApiUrl.getAllUsers).pipe(
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
    const addedRecords: IUserAction[] = this.userActions.filter(ma => ma.UserOperation === CoreResources.MenuCrudActions.Add);
    const updatedRecords: IUserAction[] = this.userActions.filter(ma => ma.UserOperation === CoreResources.MenuCrudActions.Update);
    const deletedRecords: IUserAction[] = this.userActions.filter(ma => ma.UserOperation === CoreResources.MenuCrudActions.Delete);
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
        if (ma.UserOperation === CoreResources.MenuCrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(CoreResources.UserApiUrl.addUser, newItem));
        } else if (ma.UserOperation === CoreResources.MenuCrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(CoreResources.UserApiUrl.updateUser + '/' + newItem.userId, newItem));
        } else if (ma.UserOperation === CoreResources.MenuCrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(CoreResources.UserApiUrl.deleteUser + '/' + newItem.userId));
        }
      });
    }
    return arr;
  }
}
