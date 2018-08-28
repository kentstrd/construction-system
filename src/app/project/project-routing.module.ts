import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectInformationComponent } from './project-information/project-information.component';
import { ViewOptionsComponent } from '../shared/components/view-options/view-options.component';
import { GridLayoutComponent } from '../shared/components/view-options/grid-layout/grid-layout.component';
import { TableComponent } from '../shared/components/view-options/table/table.component';
const routes: Routes = [
  { path:'project', component:ViewOptionsComponent, children:[
    {path:'', redirectTo: 'grid', pathMatch:'full'},
    {path:'grid', component: GridLayoutComponent},
    {path:'list', component: TableComponent}
  ]},
   {path:'project/new', component: ProjectInformationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
