import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  // { path: 'dashboard/employees', component: EmployeeDashboardComponent },
  { path: 'employee-details', component: EmployeeDetailsComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'employee', component: EmployeeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
