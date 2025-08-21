import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  // { path: 'page', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  // { path: 'pages',component: AuthlayoutComponent, loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)},
  // { path: 'admin' ,canActivate: [AuthGuard], component: LayoutComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  // { path: '', canActivate: [AdminGuard], loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // { path: 'select-company', canActivate: [AuthGuard], component: SelectCompanyComponent},
  // { path: 'select-project', canActivate: [AuthGuard], component: SelectProjectComponent},
  // {
  //   path:'**',component:Error404Component
  // }
  {path: '',redirectTo: 'task-management',pathMatch: 'full'},
  {path: 'task-management',component: LayoutComponent, loadChildren: () => import('./task-management/task-management.module').then(m => m.TaskManagementModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' , useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
