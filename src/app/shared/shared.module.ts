import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [PaginationComponent, HeaderComponent, ViewOptionsComponent],
  declarations: [HeaderComponent, ViewOptionsComponent, PaginationComponent]
})
export class SharedModule {}
