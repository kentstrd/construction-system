import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  EmployeeForm: FormGroup;

  constructor(private employeeBuild: FormBuilder) {}

  ngOnInit() {
    this.EmployeeForm = this.employeeBuild.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birtDate: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Skills: ['', [Validators.required]],
      addSkills: this.employeeBuild.array([]),
      contact: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      contacts: this.employeeBuild.array([]),
      addresses: this.employeeBuild.array([])
    });
  }

  // GET FORMS
  get firstName() {
    return this.EmployeeForm.get('firstName');
  }

  get lastName() {
    return this.EmployeeForm.get('lastName');
  }

  get birtDate() {
    return this.EmployeeForm.get('birtDate');
  }

  get Gender() {
    return this.EmployeeForm.get('Gender');
  }

  get skillsForm() {
    return this.EmployeeForm.get('addSkills') as FormArray;
  }
  get contacsForm() {
    return this.EmployeeForm.get('contacts') as FormArray;
  }
  get addressForm() {
    return this.EmployeeForm.get('addresses') as FormArray;
  }

  // ADD ITEMS
  addSkills() {
    const skill = this.employeeBuild.group({
      skill: []
    });
    this.skillsForm.push(skill);
  }

  addContact() {
    const phone = this.employeeBuild.group({
      homeNumber: [],
      companyNumber: []
    });

    this.contacsForm.push(phone);
  }

  addAddress() {
    const add = this.employeeBuild.group({
      street: [],
      city: [],
      province: []
    });

    this.addressForm.push(add);
  }

  // DELETE ITEMS
  deleteSkills(index) {
    this.skillsForm.removeAt(index);
  }

  deleteAddress(index) {
    this.addressForm.removeAt(index);
  }

  deleteContact(index) {
    this.contacsForm.removeAt(index);
  }

  // SUBMIT
  onSubmit() {
    console.log(this.EmployeeForm.value);
  }
}
