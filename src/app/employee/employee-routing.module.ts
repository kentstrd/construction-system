import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ViewOptionsComponent } from '../shared/components/view-options/view-options.component';
import { GridLayoutComponent } from '../shared/components/view-options/grid-layout/grid-layout.component';
import { TableComponent } from '../shared/components/view-options/table/table.component';

const routes: Routes = [
  { path: 'employee', component: ViewOptionsComponent, children:[
    {path:'', redirectTo:'list', pathMatch:'full'},
    {path:'grid', component: GridLayoutComponent},
    {path:'list', component: TableComponent}
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
