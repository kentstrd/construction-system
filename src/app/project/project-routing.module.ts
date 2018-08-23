import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectInformationComponent } from './project-information/project-information.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ViewOptionsComponent } from '../shared/components/view-options/view-options.component';
import { GridViewComponent } from '../shared/components/view-options/grid-view/grid-view.component';
import { ListViewComponent } from '../shared/components/view-options/list-view/list-view.component';
const routes: Routes = [
  { path:'project', component:ViewOptionsComponent, children:[
    {path:'', redirectTo: 'grid', pathMatch:'full'},
    {path:'grid', component: GridViewComponent},
    {path:'list', component: ListViewComponent}
  ]},
   {path:'project/new', component: ProjectInformationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
