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
      firstName: ['ATARUBS', Validators.required],
      lastName: ['mekloks', Validators.required],
      birtDate: ['1/20/2018', Validators.required],
      Gender: ['', Validators.required],
      addSkills: this.employeeBuild.array([], Validators.required),
      contacts: this.employeeBuild.array(
        [],
        [Validators.pattern('[0-9]{0-10}'), Validators.minLength(10)]
      ),
      addresses: this.employeeBuild.array([], Validators.required)
    });
    this.addSkills();
    this.addContact();
    this.addAddress();

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

  get contacts() {
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
    this.contacts.push(phone);
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
    this.contacts.removeAt(index);
  }

  // SUBMIT
  onSubmit() {
    console.log(this.EmployeeForm.value);
  }
}
