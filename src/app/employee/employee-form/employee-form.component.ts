import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contacts, Employee, Addresses } from '../models/Employee';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  skillset = [
    { name: 'Mason', value: 'Mason' },
    { name: 'Helper', value: 'Helper' },
    { name: 'Carpenter', value: 'Carpenter' },
    { name: 'Designer', value: 'Designer' }
  ];

  // text mask format
  mask: any[] = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  // form empty value
  emptyValue: string = '';

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
    private employeeService: EmployeeService,
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

    // Subscribe to the selectedEmployee
    this.employee = this.employeeService.selectedEmployee.subscribe(employee => {
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

  InitFormsValue(form, employee) {
    if (form === 'contacts') {
      employee.contacts.forEach(() => {
        this.addContact();
      });
      this.deleteContact(1);
    } else {
      employee.addresses.forEach(() => {
        this.addNewAddress();
      });
      this.deleteNewAddress(1);
    }
  }

  deleteContact(i) {
    this.contactsForm.removeAt(i);
  }

  get addressesForm() {
    return this.form.get('addresses') as FormArray;
  }

  addNewAddress() {
    const newAdd = this.fb.group({
      homeaddress: ['']
    });
    this.addressesForm.push(newAdd);
  }
  deleteNewAddress(i) {
    this.addressesForm.removeAt(i);
  }

  onSubmit() {
    if (this.isNew) {
      this.form.value.id = this.employeeService.generateId;
      this.employeeService.addEmployee(Object.assign({}, this.form.value));
    } else {
      this.employeeService.update(Object.assign({}, this.form.value));
    }
    // this works tho
    this.router.navigate(['/employee']);
  }
}
