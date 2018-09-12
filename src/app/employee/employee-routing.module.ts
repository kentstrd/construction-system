import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  // {
  //   path: 'employee',
  //   component: ViewOptionsComponent,
  //   children: [
  //     { path: '', redirectTo: 'list', pathMatch: 'full' },
  //     { path: 'grid', component: GridLayoutComponent },
  //     { path: 'list', component: TableComponent }
  //   ]
  // },
  // { path: 'employee/new', component: EmployeeFormComponent },
  // { path: 'employee/grid/view/:id', component: EmployeeFormComponent },
  // { path: 'employee/grid/edit/:id', component: EmployeeFormComponent },
  // { path: 'employee/list/view/:id', component: EmployeeFormComponent },
  // { path: 'employee/list/edit/:id', component: EmployeeFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
