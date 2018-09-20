import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ProjectComponent } from './project.component';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { GridComponent } from './grid/grid.component';
import { ManageFormComponent } from './manage-form/manage-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ProjectRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ListComponent, ProjectComponent, GridComponent, ManageFormComponent, ViewComponent]
})
export class ProjectModule {}
