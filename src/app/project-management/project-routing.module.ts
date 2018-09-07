import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOptionsComponent } from '../shared/components/view-options/view-options.component';
import { GridLayoutComponent } from '../shared/components/view-options/grid-layout/grid-layout.component';
import { TableComponent } from '../shared/components/view-options/table/table.component';
import { CreateComponent } from './create/create.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
const routes: Routes = [
  { path:'project', component:ViewOptionsComponent, children:[
    {path:'', redirectTo: 'grid', pathMatch:'full'},
    {path:'grid', component: GridLayoutComponent},
    {path:'list', component: TableComponent}
  ]},
   {path:'project/new', component: CreateComponent},
   {path:'project/grid/view/:id', component: ViewProjectComponent},
   {path:'project/grid/edit/:id', component: EditProjectComponent},
   {path:'project/list/view', component: ViewProjectComponent},  
   {path:'project/list/edit', component: EditProjectComponent},    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule {}
