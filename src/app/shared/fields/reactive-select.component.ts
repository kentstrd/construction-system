import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'reactive-select',
  template: `
  <div class="form-group row">
      
      <label class="col-2 col-form-label-sm">{{label}}</label>
    
      <select  class="form-control form-control-sm"
      [ngClass]="selectClass" 
      [formControl]="control">
        <option  *ngFor="let option of options" [value]="option">{{option}}</option>
      </select>

      <h5 class="pl-2 text-secondary"><i [class]="icon"></i></h5>

      <div class="col-12 p-0 m-0"></div>
      
      <validation-messages class="offset-2"
      [control]="control" 
      [validation_req_msg]="validation_req_msg"
      [validation_min_msg]="validation_min_msg">
      </validation-messages>
  </div>
  `,
  styleUrls: ['./fields.component.scss']
})
export class ReactiveSelectComponent implements OnInit {
  @Input() icon;
  @Input() options;
  @Input() validation_req_msg;
  @Input() placeholder;
  @Input() label;
  @Input() selectClass;
  @Input('control') 
  public control : FormControl 
    
  constructor() {
    this.placeholder = ''
  }

  ngOnInit() {
  }

}
