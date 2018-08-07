import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { SharedModule } from '../shared/shared.module';
import { SamplereactiveComponent } from './samplereactive/samplereactive.component';

@NgModule({
  imports: [CommonModule, EmployeeRoutingModule, ReactiveFormsModule, FormsModule, SharedModule],
  declarations: [EmployeeDashboardComponent, EmployeeDetailsComponent, EmployeeFormComponent, SamplereactiveComponent]
})
export class EmployeeModule {}
