import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    HeaderComponent
  ],
  declarations: [HeaderComponent, DashboardComponent]
})
export class SharedModule { }
