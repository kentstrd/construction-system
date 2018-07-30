import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ],
  declarations: [EmployeeDashboardComponent]
})
export class EmployeeModule { }
