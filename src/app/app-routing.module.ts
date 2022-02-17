import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: () => import('@page/page.module').then(m => m.PageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('@core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'login',
    loadChildren: () => import('@core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'organization',
    loadChildren: () => import('@organization/organization.module').then(m => m.OrganizationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
