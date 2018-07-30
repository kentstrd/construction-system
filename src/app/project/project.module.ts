import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule
  ],
  exports:[ProjectListComponent],
  declarations: [ProjectListComponent]
})
export class ProjectModule { }
