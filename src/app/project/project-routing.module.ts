import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {path:'dashboard', component:ProjectListComponent, children: [
    {path: '', redirectTo: 'projects', pathMatch: 'full'},
    {path: '/projects', component:ProjectListComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
