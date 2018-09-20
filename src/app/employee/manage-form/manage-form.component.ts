import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/Employee';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-form',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.scss']
})
export class ManageFormComponent implements OnInit {
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
      fullname: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]]
      }),
      skill: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      addresses: this.fb.array([
        this.fb.group({
          homeaddress: ['', [Validators.required]]
        })
      ]),
      contacts: this.fb.array([
        this.fb.group({
          homenumber: ['']
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
    const number = this.fb.group({
      homenumber: ['']
    });
    this.contacts.push(number);
  }

  addAddress() {
    const newAdd = this.fb.group({
      homeaddress: ['']
    });
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
  onSubmit() {
    if (this.isNew) {
      this.employeeForm.value.id = this.generateId();
      this.employeeService.addEmployeeToDB(this.employeeForm.value);
    } else {
      this.employeeService.updateEmployee(this.employeeForm.value);
    }
    this.location.back();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
