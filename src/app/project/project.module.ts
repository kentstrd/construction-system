import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SharedModule } from '../shared/shared.module';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectListComponent } from './project-list/project-list.component';

library.add(faCoffee);

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ProjectRoutingModule,
    SharedModule,
  ],
  declarations: [ProjectDashboardComponent, ProjectInformationComponent, ProjectListComponent]
})
export class ProjectModule { }
