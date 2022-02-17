import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationTeamUserRolesComponent } from './components/organization-team-user-roles/organization-team-user-roles.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { TeamsComponent } from './components/teams/teams.component';
import { CoreModule } from '../core/core.module';
import { MenuAccessComponent } from './components/menu-access/menu-access.component';
import { OrganizationRoutingModule } from './organization-routing.module';


@NgModule({
  declarations: [TeamsComponent, RolesComponent, UsersComponent, OrganizationTeamUserRolesComponent,
    TreeViewComponent, MenuAccessComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    CoreModule
  ],
  exports: [TeamsComponent, RolesComponent, UsersComponent, OrganizationTeamUserRolesComponent,
    TreeViewComponent, MenuAccessComponent]
})
export class OrganizationModule { }
