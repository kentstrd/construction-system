import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PesoPipe } from '../shared/pipes/peso.pipe';

@NgModule({
  imports: [
            CommonModule,
            FormsModule, 
            ProjectRoutingModule, 
            SharedModule,
            ReactiveFormsModule,
            BsDatepickerModule.forRoot(),
          ],
  providers: [CurrencyPipe, PesoPipe],
  declarations: [
                 ProjectDashboardComponent, 
                 ProjectInformationComponent, 
                 ProjectListComponent,PesoPipe
                ]
})
export class ProjectModule {}
