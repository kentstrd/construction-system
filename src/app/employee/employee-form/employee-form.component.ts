import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  EmployeeForm: FormGroup;

  availSides = [
    { display: 'None', value: '' },
    { display: 'buhat', value: 'agek' },
    { display: 'LUKSO', value: 'atarubs' }
  ];

  constructor(private employeeBuild: FormBuilder) {}

  ngOnInit() {
    this.EmployeeForm = this.employeeBuild.group({
      firstName: new FormControl('ATARUBS'),
      lastName: new FormControl('BOJACK'),
      birtDate: new FormControl(new Date('1/2/2018')),
      Gender: new FormControl('Male'),
      addSkills: this.employeeBuild.array([]),
      contact: ['', [Validators.required, Validators.minLength(10)]],
      contacts: this.employeeBuild.array([]),
      addresses: this.employeeBuild.array([])
    });
    this.addSkills();

    this.EmployeeForm.valueChanges.subscribe(console.log);
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

  get skills() {
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
    const addSkills = this.employeeBuild.group({
      skill: ['']
    });
    this.skills.push(addSkills);
  }

  addContact() {
    const phone = this.employeeBuild.group({
      numbers: ['']
    });
    this.contacsForm.push(phone);
  }

  addAddress() {
    const add = this.employeeBuild.group({
      newaddress: ['']
    });

    this.addressForm.push(add);
  }

  // DELETE ITEMS
  deleteSkills(index) {
    this.skills.removeAt(index);
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
