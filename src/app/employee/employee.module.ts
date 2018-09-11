import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeGridComponent } from './employee-grid/employee-grid.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TextMaskModule,
    HttpClientModule
  ],
  declarations: [
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeGridComponent,
    EmployeeEditComponent
  ]
})
export class EmployeeModule {}
