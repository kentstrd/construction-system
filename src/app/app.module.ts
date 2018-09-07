import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeService } from './employee/services/employee.service';
import { ProjectModule } from './project-management/project.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    ProjectModule,
    EmployeeModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {}
