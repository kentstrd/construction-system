import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { ManageFormComponent } from './manage-form/manage-form.component';
import { ViewComponent } from './view/view.component';

import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      { path: '', redirectTo: 'grid', pathMatch: 'full' },
      { path: 'grid', component: GridComponent },
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'manage/:id', component: ManageFormComponent }
    ]
  }
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
