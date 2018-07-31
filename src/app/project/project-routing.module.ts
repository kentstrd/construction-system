import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInformationComponent } from './project-information/project-information.component';

const routes: Routes = [
  {path:'project', component: ProjectDashboardComponent, children:[
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path:'list', component: ProjectListComponent},
    {path:'information', component: ProjectInformationComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
