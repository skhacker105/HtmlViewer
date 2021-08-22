import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { forkJoin, Observable } from 'rxjs';
import { RolesService } from '../../services/roles.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-organization-team-user-roles',
  templateUrl: './organization-team-user-roles.component.html',
  styleUrls: ['./organization-team-user-roles.component.scss']
})
export class OrganizationTeamUserRolesComponent implements OnInit {

  selectedIndex = 0;

  constructor(public dialogRef: MatDialogRef<OrganizationTeamUserRolesComponent>,
    public teamsService: TeamsService,
    public rolesService: RolesService) { }

  ngOnInit(): void {
    this.loadOrganizationStructure();
  }

  loadOrganizationStructure() {
    this.teamsService.parentTeams[0].children = [];
    this.rolesService.parentRoles[0].children = [];
    this.teamsService.getTeams().subscribe(res => {
      this.teamsService.converFlatTeamsToNested(res);
    });
    this.rolesService.getRoles().subscribe(res => {
      this.rolesService.converFlatRolesToNested(res);
    });
  }

  close() {
    this.dialogRef.close();
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
    forkJoin(arr).subscribe(res => {
      this.teamsService.teamsActions = [];
      this.rolesService.RolesAction = [];
      this.loadOrganizationStructure();
    })
  }

}
