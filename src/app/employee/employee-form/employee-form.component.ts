import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

import { SampleServices } from '../services/Sample.service';
import { Employee } from '../models/sample';
import { Contact, Address } from '../models/sample';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  skillset: string[] = ['STRONG', 'SMART', 'ATHLETIC'];
  default: string = 'STRONG';

  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  skill: string;
  address: Address[];
  contact: Contact[];

  form: FormGroup;
  employees: Employee[];
  public employee;

  isNew: boolean = true;

  constructor(
    private fb: FormBuilder,
    private sampleServices: SampleServices,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the selectedEmployee
    this.employee = this.sampleServices.selectedEmployee.subscribe(employee => {
      this.isNew = false;
      this.id = employee.id;
      this.firstName = employee.firstName;
      this.lastName = employee.lastName;
      this.gender = employee.gender;
      this.skill = employee.skill;
      this.address = employee.address;
      this.contact = employee.contact;
    });
    // reactive Form
    this.form = this.fb.group({
      id: [''],
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName, [Validators.required]],
      skill: [, [Validators.required]],
      gender: [this.gender, [Validators.required]],
      address: this.fb.array([]),
      contact: this.fb.array([])
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
    return this.form.get('contact') as FormArray;
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
    const result = Object.assign({}, this.form.value);

    this.sampleServices.addEmployee(Object.assign({}, this.form.value));
    // this works tho
    this.router.navigate(['/employee/details']);

    console.log(result);
  }

  reset() {
    // RESET ALL INPUTS
    this.form.reset();

    // RESETS TO MODELS
  }
}
