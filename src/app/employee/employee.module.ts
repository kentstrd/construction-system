import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeComponent } from './employee.component';
import { ManageFormComponent } from './manage-form/manage-form.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TextMaskModule
  ],
  declarations: [
    EmployeeFormComponent,
    EmployeeListComponent,
    ListComponent,
    GridComponent,
    EmployeeComponent,
    ManageFormComponent,
    ViewComponent
  ]
})
export class EmployeeModule {}
