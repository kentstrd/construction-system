import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SharedModule } from '../shared/shared.module';

import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule,
            FormsModule, 
            ProjectRoutingModule, 
            SharedModule,
            ReactiveFormsModule],
  declarations: [ProjectDashboardComponent, 
                 ProjectInformationComponent, 
                 ProjectListComponent]
})
export class ProjectModule {}
