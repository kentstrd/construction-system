import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { SamplereactiveComponent } from './samplereactive/samplereactive.component';

const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeDashboardComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: EmployeeDetailsComponent },
      { path: 'form', component: EmployeeFormComponent },
      { path: 'sample', component: SamplereactiveComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
