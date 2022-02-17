import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { RolesService } from "@organization/services/roles.service";
import { TeamsService } from "@organization/services/teams.service";
import { UsersService } from "@organization/services/users.service";
import { PageDesignerService } from "@page/services/page-designer.service";
import { Observable, forkJoin } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { UsersComponent } from "../users/users.component";

@Component({
  selector: 'app-organization-team-user-roles',
  templateUrl: './organization-team-user-roles.component.html',
  styleUrls: ['./organization-team-user-roles.component.scss']
})
export class OrganizationTeamUserRolesComponent implements OnInit, OnDestroy {

  isComponentActive = true;
  selectedIndex = 0;
  designMode: boolean;
  @ViewChild(UsersComponent) userComponent: UsersComponent;

  constructor(
    private pageDesignerService: PageDesignerService,
    public teamsService: TeamsService,
    public rolesService: RolesService,
    public usersService: UsersService) { 
      this.pageDesignerService.designerMode.pipe(takeWhile(() => this.isComponentActive))
      .subscribe(mode => {
        this.designMode = mode;
      });
    }

  ngOnInit(): void {
    this.loadOrganizationStructure();
  }

  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

  loadOrganizationStructure() {
    this.teamsService.parentTeams[0].children = [];
    this.rolesService.parentRoles[0].children = [];
    this.teamsService.getTeams().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.teamsService.converFlatTeamsToNested(res);
    });
    this.rolesService.getRoles().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.rolesService.converFlatRolesToNested(res);
    });
    this.usersService.getUsers().pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.usersService.users = res;
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  saveChanges() {
    const arr: Observable<any>[] = [];
    if (this.teamsService.teamsActions.length > 0) {
      arr.push(this.teamsService.saveAllChanges());
    }
    if (this.rolesService.RolesAction.length > 0) {
      arr.push(this.rolesService.saveAllChanges());
    }
    if (this.usersService.userActions.length > 0) {
      arr.push(this.usersService.saveAllChanges());
    }
    forkJoin(arr).pipe(takeWhile(() => this.isComponentActive))
    .subscribe(res => {
      this.teamsService.teamsActions = [];
      this.rolesService.RolesAction = [];
      this.usersService.userActions = [];
      this.loadOrganizationStructure();
    })
  }

  handleAddRole() {
    this.userComponent.handleAdd();
  }

}
