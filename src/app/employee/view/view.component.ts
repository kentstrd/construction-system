import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  employeeForm: FormGroup;
  isNew: boolean = false;
  skillOptions: string[] = ['Mason', 'Helper', 'Carpenter'];

  // text mask format
  mask: any[] = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.employeeForm = this.fb.group({
      id: [''],
      fullname: this.fb.group({
        firstName: [{ value: null, disabled: true }],
        lastName: [{ value: null, disabled: true }]
      }),
      skill: [{ value: null, disabled: true }],
      gender: [{ value: null, disabled: true }],
      addresses: this.fb.array([
        this.fb.group({
          homeaddress: [{ value: null, disabled: true }]
        })
      ]),
      contacts: this.fb.array([
        this.fb.group({
          homenumber: [{ value: null, disabled: true }]
        })
      ])
    });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      params.id === 'new'
        ? (this.isNew = true)
        : this.employeeService.employees.forEach(employee => {
            employee._id === params.id ? this.generateForm(employee) : null;
          });
    });
  }
  generateForm(employee: Employee) {
    employee.addresses.forEach(() => this.addAddress());
    employee.contacts.forEach(() => this.addContact());
    this.deleteAddress(1);
    this.deleteContact(1);
    this.employeeForm.patchValue(employee);
    console.log(employee);
  }

  addContact() {
    const number = this.fb.group({ homenumber: [{ value: null, disabled: true }] });
    this.contacts.push(number);
  }

  addAddress() {
    const newAdd = this.fb.group({ homeaddress: [{ value: null, disabled: true }] });
    this.addresses.push(newAdd);
  }
  deleteAddress(i) {
    this.addresses.removeAt(i);
  }

  deleteContact(i) {
    this.contacts.removeAt(i);
  }

  get contacts() {
    return this.employeeForm.get('contacts') as FormArray;
  }
  get addresses() {
    return this.employeeForm.get('addresses') as FormArray;
  }
  get fullName() {
    return this.employeeForm.get('fullname');
  }
  get skill() {
    return this.employeeForm.get('skill');
  }
  get gender() {
    return this.employeeForm.get('gender');
  }

  back() {
    this.location.back();
  }
}
