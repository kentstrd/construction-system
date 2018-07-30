import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectRoutingModule
  ],
  declarations: [ProjectDashboardComponent]
})
export class ProjectModule { }
