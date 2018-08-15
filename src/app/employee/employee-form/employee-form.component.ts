import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { SampleServices } from '../services/Sample.service';
import { Employee } from '../models/sample';
import { Contact, Address } from '../models/sample';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  skillset = [
    { name: 'Singer', value: 'Singer' },
    { name: 'Athlete', value: 'Athlete' },
    { name: 'Smart', value: 'Smart' }
  ];

  mask: any[] = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  skill: string;
  address: Address[];
  contact: Contact[];

  public form: FormGroup;
  employees: Employee[];
  public employee;

  isNew: boolean = true;

  constructor(
    private fb: FormBuilder,
    private sampleServices: SampleServices,
    private router: Router
  ) {}

  ngOnInit() {
    // FORM CREATE
    this.form = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      skill: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: this.fb.array([
        this.fb.group({
          homeaddress: ['']
        })
      ]),
      contact: this.fb.array([
        this.fb.group(
          {
            homenumber: ['']
          },
          Validators.minLength(9)
        )
      ])
    });

    // Subscribe to the selectedEmployee
    this.employee = this.sampleServices.selectedEmployee.subscribe(employee => {
      if (employee.id != null) {
        this.isNew = false;
        this.InitFormsValue('adddress', employee);
        this.InitFormsValue('contact', employee);
        this.form.patchValue(employee);
      }
    });
  }

  get phoneForms() {
    return this.form.get('contact') as FormArray;
  }
  addContact() {
    const number = this.fb.group({
      homenumber: ['']
    });
    this.phoneForms.push(number);
  }

  InitFormsValue(form, employee) {
    if (form === 'contact') {
      employee.contact.forEach(() => {
        this.addContact();
      });
      this.deleteContact(1);
    } else {
      employee.address.forEach(() => {
        this.addNewAddress();
      });
      this.deleteNewAddress(1);
    }
  }

  deleteContact(i) {
    this.phoneForms.removeAt(i);
  }

  get addressForms() {
    return this.form.get('address') as FormArray;
  }

  addNewAddress() {
    const newAdd = this.fb.group({
      homeaddress: ['']
    });
    this.addressForms.push(newAdd);
  }
  deleteNewAddress(i) {
    this.addressForms.removeAt(i);
  }

  onSubmit() {
    if (this.isNew) {
      this.form.value.id = this.generateId;
      this.sampleServices.addEmployee(Object.assign({}, this.form.value));
      document.getElementById('test').nodeValue = 'Save';
    } else {
      this.sampleServices.update(Object.assign({}, this.form.value));
      document.getElementById('test').nodeValue = 'Update';
    }
    // this works tho
    this.router.navigate(['/employee/details']);
    this.sampleServices.changeText();
    this.form.reset();
  }

  reset() {
    // RESET ALL INPUTS
    this.form.reset();

    // RESETS TO MODELS
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
