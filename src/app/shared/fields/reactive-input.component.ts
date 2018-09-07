import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'reactive-input',
  template: `
  <div class="form-group row">
      
      <label [ngClass]="{'col-4': dualColumn}" 
      class="col-2 col-form-label-sm">{{label}}</label>
    
      <input [type] = "type"
      [value] = "value"
      [placeholder] = "placeholder"
      [formControl]="control" 
      [class]="inputClass"
      class="form-control form-control-sm"
      [ngClass]="{'invalid' : customValidation}">

      <div class="col-12 p-0 m-0"></div>
      
      <validation-messages class="offset-2"
      [customValidation]="customValidation"
      [ngClass]="{'offset-4': dualColumn}" 
      [control]="control"
      [validation_cus_msg]="validation_cus_msg"
      [validation_pat_msg]="validation_pat_msg"
      [validation_req_msg]="validation_req_msg"
      [validation_min_msg]="validation_min_msg">
      </validation-messages>
  </div>
  `,
  styleUrls: ['./fields.component.scss']
})
export class ReactiveInputComponent implements OnInit {
  @Input() customValidation : boolean;
  @Input() value : string;
  @Input() dualColumn : boolean;
  @Input() type : string;
  @Input() validation_cus_msg : string;
  @Input() validation_pat_msg : string;
  @Input() validation_req_msg : string;
  @Input() validation_min_msg : string;
  @Input() placeholder : string;
  @Input() label : string;
  @Input() inputClass : string;
  @Input('control') 
  public control : FormControl 
    
  constructor() {
    this.value = ''
    this.placeholder = ''
    this.dualColumn = false
  }

  ngOnInit() {
  }

}
