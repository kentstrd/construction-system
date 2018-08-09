import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

import { SampleServices } from '../services/Sample.service';
import { Employee } from '../models/sample';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  skillset: string[] = ['STRONG', 'SMART', 'ATHLETIC'];
  default: string = 'SMART';

  form: FormGroup;
  employees: Employee[] = [];

  constructor(private fb: FormBuilder, private sampleServices: SampleServices) {}

  ngOnInit() {
    // subscribe to subject on initialization
    this.sampleServices.employeeSubject.subscribe({
      next: employees => this.displayEmployee(employees),
      error: error => console.log(error)
    });

    // INITIALIZE EMPLOYEE
    // this.sampleServices.getEmployees();

    // reactive Form
    this.form = this.fb.group({
      firstName: '',
      lastName: '',
      skill: '',
      gender: 'Male',
      phones: this.fb.array([]),
      address: this.fb.array([])
    });
    this.form.patchValue({
      skill: this.default
    });

    this.form.controls['skill'].setValue(this.default, { onlySelf: true });

    this.addContact();
    this.addNewAddress();
  }

  private displayEmployee(employees: any): void {
    this.employees = employees;
  }

  get phoneForms() {
    return this.form.get('phones') as FormArray;
  }
  addContact() {
    const number = this.fb.group({
      homenumber: []
    });
    this.phoneForms.push(number);
  }

  deleteContact(i) {
    this.phoneForms.removeAt(i);
  }

  get addressForms() {
    return this.form.get('address') as FormArray;
  }
  addNewAddress() {
    const newAdd = this.fb.group({
      homeaddress: []
    });
    this.addressForms.push(newAdd);
  }
  deleteNewAddress(i) {
    this.addressForms.removeAt(i);
  }

  onSubmit() {
    // console.log(this.sampleServices.addEmployee(employees));
    const result: Employee = Object.assign({}, this.form.value);

    console.log(result);
  }

  reset() {
    // RESET ALL INPUTS
    this.form.reset();

    // RESETS TO MODELS
  }
}
