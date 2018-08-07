import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ViewOptionsComponent } from './view-options/view-options.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [PaginationComponent, HeaderComponent, ViewOptionsComponent],
  declarations: [HeaderComponent, ViewOptionsComponent, PaginationComponent]
})
export class SharedModule {}
