import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { GridItemComponent } from './components/view-options/grid-item/grid-item.component';
import { GridLayoutComponent } from './components/view-options/grid-layout/grid-layout.component';
import { TableComponent } from './components/view-options/table/table.component';
import { TableRowComponent } from './components/view-options/table-row/table-row.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [PaginationComponent, HeaderComponent, ViewOptionsComponent],
  declarations: [HeaderComponent, ViewOptionsComponent, PaginationComponent, GridLayoutComponent, TableComponent, GridItemComponent, TableRowComponent]
})
export class SharedModule {}
