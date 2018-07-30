import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent, children: [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
    {path: ':category', component: HeaderComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
