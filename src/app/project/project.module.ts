import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SharedModule } from '../shared/shared.module';

import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [CommonModule, ProjectRoutingModule, SharedModule],
  declarations: [ProjectDashboardComponent, ProjectInformationComponent, ProjectListComponent]
})
export class ProjectModule {}
