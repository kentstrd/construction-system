import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-samplereactive',
  templateUrl: './samplereactive.component.html',
  styleUrls: ['./samplereactive.component.scss']
})
export class SamplereactiveComponent implements OnInit {
  form: FormGroup;
  // employees = {
  //   firstName: 'firstName',
  //   lastName: 'lastName',
  //   Gender: 'Gender',
  //   Contact: 'Contact'
  // };

  employeeProps = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      Gender: '',
      phones: this.fb.array([])
    });

    this.form.valueChanges.subscribe(console.log);
  }

  ngOnInit() {
    this.addContact();
  }

  get PhoneForms() {
    return this.form.get('phones') as FormArray;
  }

  addContact() {
    const number = this.fb.group({
      HomeNumber: []
    });
    this.PhoneForms.push(number);
  }

  deleteContact(i) {
    this.PhoneForms.removeAt(i);
  }
}
