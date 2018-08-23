import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ViewOptionsComponent } from '../shared/components/view-options/view-options.component';
import { GridViewComponent } from '../shared/components/view-options/grid-view/grid-view.component';
import { ListViewComponent } from '../shared/components/view-options/list-view/list-view.component';

const routes: Routes = [
  { path: 'employee', component: ViewOptionsComponent, children:[
    {path:'', redirectTo:'list', pathMatch:'full'},
    {path:'grid', component: GridViewComponent},
    {path:'list', component: ListViewComponent}
  ]},
    {path:'employee/new', component: EmployeeFormComponent}
  // {
  //   path: 'employee',
  //   component: HeaderComponent,
  //   children: [
  //     { path: '', redirectTo: 'details', pathMatch: 'full' },
  //     { path: 'records', component: EmployeeDetailsComponent, children:[
  //       {path:'', redirectTo:'list', pathMatch: 'full'},
  //       {path:'grid', component: GridViewComponent},
  //       {path:'list', component: ListViewComponent}
  //     ]},
  //     { path: 'form', component: EmployeeFormComponent },
  //     { path: ':id', component: EmployeeFormComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
