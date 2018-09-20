import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-fullname',
  template: `
  <div class="form-group row"[formGroup]="group">
      
      <label class="col-2 col-form-label-sm">{{label}}</label>
    
      <input  type="text" class="form-control form-control-sm col-3 " 
      placeholder="First Name" formControlName="firstName">

      <input  type="text" class="form-control form-control-sm col-3 ml-3" 
      placeholder="Last Name" formControlName="lastName">

      <div class="col-12 p-0 m-0"></div>
      
      <div class="text-danger small offset-2" 
      *ngIf="group.invalid && (group.dirty || group.touched)">

      <span>{{validation_req_msg}} </span>
      
      </div>

  </div>
  `,
  styleUrls: ['./fields.component.scss']
})
export class ReactiveFullnameComponent implements OnInit {
  @Input()
  type;
  @Input()
  validation_req_msg;
  @Input()
  validation_min_msg;
  @Input()
  placeholder;
  @Input()
  label;
  @Input()
  inputClass;
  @Input('group')
  public group: FormGroup;

  constructor() {
    this.placeholder = '';
  }

  ngOnInit() {
    console.log(this.group);
  }
}
