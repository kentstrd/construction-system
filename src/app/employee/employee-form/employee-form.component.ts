import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
import { EmployeeDetailsService } from '../services/Employee-details.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  @Input() EmployeeForm: FormGroup;
  employees: Employee[];

  public countries = [];
  // public isButtonVisible: boolean = false;
  public powers = [];
  isFormValid: boolean = null;
  id: string;
  firstName: string = 'John';
  lastName: string = 'Smith';
  birthDate: any = '1/20/2018';
  Gender: string = 'Male';
  skills: Array<string> = ['Higa', 'Matulog', 'Talon'];
  contacts: Array<string> = ['09121234123'];
  address: Array<string> = ['Manila, Metro Manila'];

  isNew: boolean = true;

  constructor(
    private employeeBuild: FormBuilder,
    private employeeDetailsService: EmployeeDetailsService
  ) {
    this.countries = [{ value: 'AGEK' }, { value: 'LUKSO' }, { value: 'Imba' }];
    this.powers = [{ value: 'meklok' }, { value: 'lusko' }, { value: 'magmahal' }];
  }

  ngOnInit() {
    // this.EmployeeForm = this.employeeBuild.group({
    //   thisfirstName: ['ATARUBS', Validators.required],
    //   lastName: ['mekloks', Validators.required],
    //   birthDate: ['1/20/2018', Validators.required],
    //   Gender: ['', Validators.required],
    //   country: [''],
    //   addSkills: this.employeeBuild.array([], Validators.required),
    //   contacts: this.employeeBuild.array(
    //     [],
    //     [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.minLength(10)]
    //   ),
    //   addresses: this.employeeBuild.array([], Validators.required)
    // });
    // this.addSkills();
    // this.addContact();
    // this.addAddress();
    // this.addCountry();

    this.EmployeeForm.valueChanges.subscribe(console.log);

    // SUBSCRIBE TO THE SELECTED LOG OBSERVABLE
    this.employeeDetailsService.selectedEmployee.subscribe(employee => {
      if (employee.id != null) {
        this.isNew = false;
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.birthDate = employee.birthDate;
        this.skills = employee.skills;
        this.contacts = employee.contacts;
        this.address = employee.address;
      }
    });
  }

  // GET FORMS
  // get firstName() {
  //   return this.EmployeeForm.get('firstName');
  // }

  // get lastName() {
  //   return this.EmployeeForm.get('lastName');
  // }

  // get birthDate() {
  //   return this.EmployeeForm.get('birthDate');
  // }

  // get Gender() {
  //   return this.EmployeeForm.get('Gender');
  // }

  // get skills() {
  //   return this.EmployeeForm.get('addSkills') as FormArray;
  // }

  // get contacts() {
  //   return this.EmployeeForm.get('contacts') as FormArray;
  // }
  // get addressForm() {
  //   return this.EmployeeForm.get('addresses') as FormArray;
  // }
  // get country() {
  //   return this.EmployeeForm.get('country') as FormArray;
  // }

  // ADD ITEMS
  // addCountry() {
  //   const bansa = this.employeeBuild.group({
  //     morecountries: []
  //   });
  //   this.countries.push(bansa);
  // }
  // addSkills() {
  //   const addSkills = this.employeeBuild.group({
  //     skill: []
  //   });
  //   this.skills.push(addSkills);
  // }

  // addContact() {
  //   const phone = this.employeeBuild.group({
  //     numbers: ['']
  //   });
  //   this.contacts.push(phone);
  // }

  // addAddress() {
  //   const add = this.employeeBuild.group({
  //     address: ['']
  //   });

  //   // this.isButtonVisible = !this.isButtonVisible;
  //   this.addressForm.push(add);
  // }

  // // DELETE ITEMS
  // deleteSkills(index) {
  //   this.skills.removeAt(index);
  // }

  // deleteAddress(index) {
  //   this.addressForm.removeAt(index);
  // }

  // deleteContact(index) {
  //   this.contacts.removeAt(index);
  // }

  // SUBMIT
  onSubmit() {
    // checked if new employee
    if (this.isNew) {
      // CREATE NEW EMPLOYEE
      const newEmployee = {
        id: this.generateId(),
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: new Date(),
        Gender: this.Gender,
        skills: this.skills,
        contacts: this.contacts,
        address: this.address
      };
      // add Employee
      this.employeeDetailsService.addEmployee(newEmployee);
    } else {
      // Create Employee to be Updated
      const updateEmployee = {
        id: this.generateId(),
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: new Date(),
        Gender: this.Gender,
        skills: this.skills,
        contacts: this.contacts,
        address: this.address
      };
      // update Employee
      this.employeeDetailsService.updateEmployee(updateEmployee);
    }
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
