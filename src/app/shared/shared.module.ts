import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewOptionsComponent } from './components/view-options/view-options.component';
import { GridViewComponent } from './components/view-options/grid-view/grid-view.component';
import { ListViewComponent } from './components/view-options/list-view/list-view.component';
import { GridItemComponent } from './components/view-options/grid-item/grid-item.component';
import { ListItemComponent } from './components/view-options/list-item/list-item.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [PaginationComponent, HeaderComponent, ViewOptionsComponent],
  declarations: [HeaderComponent, ViewOptionsComponent, PaginationComponent, GridViewComponent, ListViewComponent, GridItemComponent, ListItemComponent]
})
export class SharedModule {}
