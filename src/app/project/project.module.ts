import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectFormViewComponent } from './project-form-view/project-form-view.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
            CommonModule,
            FormsModule, 
            ProjectRoutingModule, 
            SharedModule,
            ReactiveFormsModule,
            BsDatepickerModule.forRoot()
          ],
  declarations: [
                 ProjectDashboardComponent, 
                 ProjectInformationComponent, 
                 ProjectListComponent,
                 ProjectFormComponent,
                 ProjectFormViewComponent,
                 UpdateComponent
                ]
})
export class ProjectModule {}
