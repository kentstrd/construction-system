import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'validation-messages',
  template: `
      <div class="text-danger small"
      *ngIf="control.invalid && (control.dirty || control.touched) && !control.errors?.pattern"> 

       <span *ngIf="control.errors?.required">      
       {{validation_req_msg}}
       </span>
       
      <div class="col-12 p-0 m-0"></div>

       <span *ngIf="control.errors?.minlength">      
       {{validation_min_msg}}
       </span>

       <div class="col-12 p-0 m-0"></div>
      
       </div>

       <span class="text-danger small" *ngIf="control.errors?.pattern">      
       {{validation_pat_msg}}
       </span>

       <div class="col-12 p-0 m-0"></div>

       <span class="text-danger small" *ngIf="customValidation">      
       {{validation_cus_msg}}
       </span>
  `,
  styleUrls: ['./fields.component.scss']
})
export class ValidationMessagesComponent implements OnInit {
  @Input()
  validation_cus_msg;
  @Input()
  validation_pat_msg;
  @Input()
  validation_req_msg;
  @Input()
  validation_min_msg;
  @Input()
  customValidation: boolean;
  @Input('control')
  public control: FormControl;

  constructor() {
    this.customValidation = false;
    this.validation_req_msg = '';
    this.validation_min_msg = '';
    this.validation_pat_msg = '';
    this.validation_cus_msg = '';
  }

  ngOnInit() {}
}
