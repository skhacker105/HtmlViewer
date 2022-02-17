import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationTeamUserRolesComponent } from './components/organization-team-user-roles/organization-team-user-roles.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationTeamUserRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
