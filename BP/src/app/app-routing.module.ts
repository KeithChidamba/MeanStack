import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = 
[
  { path: '', loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule) }, 
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },   { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
  //{ path: 'nav', loadChildren: () => import('./nav/nav.module').then(m => m.NavModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
