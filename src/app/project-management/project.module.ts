import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PesoPipe } from '../shared/pipes/peso.pipe';
import { CreateComponent } from './create/create.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';

@NgModule({
  imports: [
            CommonModule,
            FormsModule, 
            ProjectRoutingModule, 
            SharedModule,
            ReactiveFormsModule,
          ],
  providers: [CurrencyPipe, PesoPipe],
  declarations: [
                 CreateComponent, 
                 PesoPipe, EditProjectComponent, ViewProjectComponent
                ]
})
export class ProjectModule {}
