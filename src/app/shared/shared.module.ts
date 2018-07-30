import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ViewOptionsComponent } from './view-options/view-options.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent,ViewOptionsComponent],
  declarations: [HeaderComponent, ViewOptionsComponent]
})
export class SharedModule { }
