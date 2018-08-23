import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TextMaskModule
  ],
  declarations: [
    EmployeeFormComponent,
  ]
})
export class EmployeeModule {}
