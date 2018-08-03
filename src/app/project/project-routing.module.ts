import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectFormViewComponent } from './project-form-view/project-form-view.component';
import { ProjectFormComponent } from './project-form/project-form.component';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectDashboardComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ProjectListComponent },
      { path: 'form', component: ProjectFormComponent, children:[
        {path: '', component: ProjectInformationComponent},
        {path: 'view', component: ProjectFormViewComponent}
      ] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
