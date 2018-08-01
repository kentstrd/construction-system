import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    SharedModule
  ],
  declarations: [EmployeeDashboardComponent, EmployeeDetailsComponent, EmployeeFormComponent]
})
export class EmployeeModule {}
