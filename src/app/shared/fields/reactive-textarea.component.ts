import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'reactive-textarea',
  template: `
  <div class="form-group row">
      
      <label class="col-2 col-form-label-sm">{{label}}</label>
    
      <textarea class="form-control form-control-sm "
      [ngClass]="inputClass"
      [rows]="rows" [formControl]="control"></textarea>

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
export class ReactiveTextareaComponent implements OnInit {
  @Input() validation_req_msg;
  @Input() validation_min_msg;
  @Input() rows;
  @Input() label;
  @Input() inputClass;
  @Input('control') 
  public control : FormControl 
    
  constructor() {
   }

  ngOnInit() {
  }

}
