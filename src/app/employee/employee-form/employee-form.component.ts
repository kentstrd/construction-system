import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Employee, Addresses, Contacts } from '../models/Employee';
import { Router } from '@angular/router';

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

  // text mask format
  mask: any[] = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  skill: string;
  addresses: Addresses[];
  contacts: Contacts[];

  public form: FormGroup;
  employees: Employee[];
  public employee;

  isNew: boolean = true;

  constructor(
    private fb: FormBuilder,
    private employeeServices: EmployeeService,
    private router: Router
  ) {
    // FORM CREATE
    this.form = this.fb.group({
      id: [''],
      firstName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z -\'] +')]
      ],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      skill: [''],
      gender: [''],
      addresses: this.fb.array([
        this.fb.group({
          homeaddress: ['']
        })
      ]),
      contacts: this.fb.array([
        this.fb.group(
          {
            homenumber: ['']
          },
          Validators.minLength(9)
        )
      ])
    });
  }

  ngOnInit() {
    // Subscribe to the selectedEmployee
    this.employee = this.employeeServices.selectedEmployee.subscribe(employee => {
      if (employee.id != null) {
        this.isNew = false;
        this.InitFormsValue('adddresses', employee);
        this.InitFormsValue('contacts', employee);
        this.form.patchValue(employee);
      }
    });
  }

  get contactsForm() {
    return this.form.get('contacts') as FormArray;
  }

  addContact() {
    const number = this.fb.group({
      homenumber: ['']
    });
    this.contactsForm.push(number);
  }

  deleteContact(i) {
    this.contactsForm.removeAt(i);
  }

  get addressForms() {
    return this.form.get('addresses') as FormArray;
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


  InitFormsValue(form, employee) {
    if (form === 'contacts') {
      employee.contacts.forEach(() => {
        this.addContact();
      });
      this.deleteContact(0);
    } else {
      employee.addresses.forEach(() => {
        this.addNewAddress();
      });
      this.deleteNewAddress(0);
    }
  }


  onSubmit() {
    if (this.isNew) {
      this.form.value.id = this.employeeServices.generateId;
      this.employeeServices.addEmployee(Object.assign({}, this.form.value));
    } else {
      this.employeeServices.update(Object.assign({}, this.form.value));
    }
    // this works tho
    this.router.navigate(['/employee/list']);
  }
}
