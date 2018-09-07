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
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveInputComponent } from './fields/reactive-input.component';
import { ValidationMessagesComponent } from './fields/validation-messages.component';
import { ReactiveTextareaComponent } from './fields/reactive-textarea.component';
import { ReactiveSelectComponent } from './fields/reactive-select.component';
import { ReactiveAddressComponent } from './fields/reactive-address.component';

@NgModule({
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  exports: [PaginationComponent,
            HeaderComponent, 
            ViewOptionsComponent,
            SubHeaderComponent, 
            ValidationMessagesComponent,
            ReactiveInputComponent,
            ReactiveTextareaComponent,
            ReactiveSelectComponent,
            ReactiveAddressComponent],
  declarations: [HeaderComponent, 
                 ViewOptionsComponent, 
                 PaginationComponent,
                 GridLayoutComponent,
                 TableComponent, 
                 GridItemComponent, 
                 TableRowComponent,
                 ValidationMessagesComponent, 
                 SubHeaderComponent,
                 ReactiveAddressComponent,
                 ReactiveInputComponent,
                 ReactiveTextareaComponent,
                 ReactiveSelectComponent]
})
export class SharedModule {}
