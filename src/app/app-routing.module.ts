import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from '@core/components/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('@page/page.module').then(m => m.PageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('@core/core.module').then(m => m.CoreModule)
  },
  {
    path: 'login',
    loadChildren: () => import('@core/core.module').then(m => m.CoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
