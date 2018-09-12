import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { ViewComponent } from './view/view.component';
import { ManageFormComponent } from './manage-form/manage-form.component';

const routes: Routes = [
  {
    path: 'project',
    component: ProjectComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      { path: 'grid', component: GridComponent },
      { path: 'list', component: ListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
