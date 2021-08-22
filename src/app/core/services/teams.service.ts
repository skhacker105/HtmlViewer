import { Injectable } from '@angular/core';
import { IActionResult } from '../interfaces/ActionResult';
import { ITeams } from '../interfaces/Teams';
import { ITeamAction } from '../interfaces/OrganizationActions';
import { Teams } from '../modles/teams';
import { CoreResources } from '../utilities/resources';
import { HttpWrapperService } from './http-wrapper.service';
import { forkJoin, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  public parentTeams: ITeams[] = [new Teams('000', 'Organisation', null)];
  public teamsActions: ITeamAction[] = [];
  public flatTeams: ITeams[];

  constructor(private httpService: HttpWrapperService) {
  }

  getTeamParentByTeamId(teamArray: Teams[], teamId: string): ITeams {
    let result: ITeams;
    if (teamArray) {
      teamArray.forEach(ta => {
        if (!result && ta.children.findIndex(t => t.Id === teamId) >= 0) {
          result = ta;
        } else if (!result && ta.children) {
          result = this.getTeamParentByTeamId(ta.children, teamId);
        }
      });
    }
    return result;
  }

  addTeam(teamName: string, teamId?: string, parentTeam?: ITeams) {
    let result: IActionResult = {
      completed: false
    };
    if (!parentTeam) {
      // add team as parent team
      this.parentTeams.push(new Teams(teamId, teamName, null));
      result.completed = true;
    } else {
      result = parentTeam.addChild(teamId, teamName);
    }
    return result;
  }

  converFlatTeamsToNested(flatTeams: ITeams[]): void {
    this.parentTeams[0].children = this.getChildren(this.parentTeams[0], flatTeams);
  }

  private getChildren(node: ITeams, flatMenu: ITeams[]): ITeams[] {
    let children: ITeams[] = [];
    children = flatMenu.filter(m => m.parentId === node.Id);
    if (children && children.length > 0) {
      children.forEach(c => {
        c.children = this.getChildren(c, flatMenu);
      });
    }
    return children;
  }

  // Teams Actions
  private registerteamsActions(node: ITeams, action: string) {
    this.teamsActions.push({
      TeamItem: node,
      TeamOperation: action
    });
  }

  private deleteteamsActions(node: ITeams) {
    const n = this.teamsActions.findIndex(ta => ta.TeamItem.Id === node.Id);
    if (n >= 0) {
      this.teamsActions.splice(n, 1);
    }
  }

  public registerAddteamsActions(node: ITeams) {
    this.registerteamsActions(node, CoreResources.MenuCrudActions.Add);
  }

  public registerUpdateteamsAction(node: ITeams) {
    const isNewNode = (this.teamsActions.findIndex(ta => ta.TeamItem.Id === node.Id && ta.TeamOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deleteteamsActions(node);
    if (!isNewNode) {
      this.registerteamsActions(node, CoreResources.MenuCrudActions.Update);
    } else {
      this.registerteamsActions(node, CoreResources.MenuCrudActions.Add);
    }
  }

  public registerDeleteteamsAction(node: ITeams) {
    const isNewNode = (this.teamsActions.findIndex(ta => ta.TeamItem.Id === node.Id && ta.TeamOperation === CoreResources.MenuCrudActions.Add) >= 0);
    this.deleteteamsActions(node);
    if (!isNewNode) {
      this.registerteamsActions(node, CoreResources.MenuCrudActions.Delete);
    }
  }

  // APIs

  public getTeams(): Observable<ITeams[]> {
    return this.httpService.getData(CoreResources.TeamsApiUrl.getAllTeams).pipe(
      map((d: any[]) => {
        const convertedControls: ITeams[] = [];
        d.forEach(item => {
          convertedControls.push(new Teams(item['teamId'], item['teamName'], item['parentTeamId']));
        });
        this.flatTeams = JSON.parse(JSON.stringify(convertedControls));
        return convertedControls;
      }),
      catchError((err) => {
        return of([])
      })
    );
  }

  public saveAllChanges(): Observable<any> {
    const addedRecords: ITeamAction[] = this.teamsActions.filter(ma => ma.TeamOperation === CoreResources.MenuCrudActions.Add);
    const updatedRecords: ITeamAction[] = this.teamsActions.filter(ma => ma.TeamOperation === CoreResources.MenuCrudActions.Update);
    const deletedRecords: ITeamAction[] = this.teamsActions.filter(ma => ma.TeamOperation === CoreResources.MenuCrudActions.Delete);
    let calls: Observable<any>[] = [];
    calls = calls.concat(this.generateApiCalls(addedRecords));
    calls = calls.concat(this.generateApiCalls(updatedRecords));
    calls = calls.concat(this.generateApiCalls(deletedRecords));
    return forkJoin(calls);
  }

  private generateApiCalls(teamActions: ITeamAction[]): Observable<any>[] {
    const arr: Observable<any>[] = [];
    if (teamActions && teamActions.length > 0) {
      teamActions.forEach(ma => {
        const newItem: any = {
          teamId: ma.TeamItem.Id,
          teamName: ma.TeamItem.name,
          parentTeamId: ma.TeamItem.parentId
        };
        if (ma.TeamOperation === CoreResources.MenuCrudActions.Add) {
          // ADD
          arr.push(this.httpService.postData(CoreResources.TeamsApiUrl.addTeam, newItem));
        } else if (ma.TeamOperation === CoreResources.MenuCrudActions.Update) {
          // UPDATE
          arr.push(this.httpService.putData(CoreResources.TeamsApiUrl.updateTeam + '/' + newItem.teamId, newItem));
        } else if (ma.TeamOperation === CoreResources.MenuCrudActions.Delete) {
          // DELETE
          arr.push(this.httpService.deleteData(CoreResources.TeamsApiUrl.deleteTeam + '/' + newItem.teamId));
        }
      });
    }
    return arr;
  }
}
