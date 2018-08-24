import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProjectInformationComponent } from './project-information/project-information.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PesoPipe } from '../shared/pipes/peso.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, ProjectRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [CurrencyPipe, PesoPipe],
  declarations: [ProjectInformationComponent, ProjectListComponent, PesoPipe]
})
export class ProjectModule {}
