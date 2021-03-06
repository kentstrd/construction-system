import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveInputComponent } from './fields/reactive-input.component';
import { ValidationMessagesComponent } from './fields/validation-messages.component';
import { ReactiveTextareaComponent } from './fields/reactive-textarea.component';
import { ReactiveSelectComponent } from './fields/reactive-select.component';
import { ReactiveAddressComponent } from './fields/reactive-address.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PesoPipe } from './pipes/peso.pipe';
import { HeaderComponent } from './header/header.component';
import { ViewOptionsComponent } from './view-options/view-options.component';
import { SubHeaderComponent } from './sub-header/sub-header.component';
import { GridItemComponent } from './grid-item/grid-item.component';
import { TableRowComponent } from './table-row/table-row.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { ReactiveFullnameComponent } from './fields/reactive-fullname.component';
import { ReactiveGenderComponent } from './fields/reactive-gender.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NgxPaginationModule],
  exports: [
    HeaderComponent,
    ViewOptionsComponent,
    SubHeaderComponent,
    ValidationMessagesComponent,
    ReactiveInputComponent,
    ReactiveTextareaComponent,
    ReactiveSelectComponent,
    ReactiveAddressComponent,
    ReactiveFullnameComponent,
    ReactiveGenderComponent,
    GridItemComponent,
    TableRowComponent,
    PesoPipe,
    ConfirmModalComponent
  ],
  declarations: [
    HeaderComponent,
    ViewOptionsComponent,
    GridItemComponent,
    TableRowComponent,
    ValidationMessagesComponent,
    SubHeaderComponent,
    ReactiveGenderComponent,
    ReactiveFullnameComponent,
    ReactiveAddressComponent,
    ReactiveInputComponent,
    ReactiveTextareaComponent,
    ReactiveSelectComponent,
    PesoPipe,
    ConfirmModalComponent,
    DeleteComponent
  ]
})
export class SharedModule {}
