import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'reactive-gender',
  template: `
      <div class="row">
     <label class="col-2 col-form-label-sm">Gender</label>
      <div class="form-group">
        <div class="radio">
          <label class="mr-4">
            <input type="radio" class="ml-2" value="Male"  [formControl]= control> Male
          </label>
          <label>
            <input type="radio" value="Female"  [formControl]= control> Female
          </label>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./fields.component.scss']
})
export class ReactiveGenderComponent implements OnInit {
  @Input()
  validation_req_msg;
  @Input()
  validation_min_msg;
  @Input()
  inputClass;
  @Input('control')
  public control: FormControl;

  constructor() {}

  ngOnInit() {}
}
