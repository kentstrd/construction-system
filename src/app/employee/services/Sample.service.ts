import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Employee, Contact, Address } from '../models/sample';

@Injectable({
  providedIn: 'root'
})
export class SampleServices {
  public employeeSubject: Subject<any> = new Subject();
  employees: Employee[];
  contact: Contact[];
  address: Address[];

  public employeesSource = new BehaviorSubject<Employee>({
    id: null,
    firstName: null,
    lastName: null,
    gender: null,
    skill: null,
    contact: null,
    address: null
  });

  selectedEmployee = this.employeesSource.asObservable();

  constructor() {
    this.employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Cena',
        gender: 'Male',
        skill: 'ATHLETIC',
        contact: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }],
        address: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }]
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Smith',
        gender: 'Female',
        skill: 'STRONG',
        contact: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }],
        address: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }]
      }
    ];
  }

  // getEmployee() {
  //   console.log('FETCHING SERVICES ....');
  //   try {
  //     this.employeeSubject.next(this.employees);
  //   } catch (error) {
  //     this.employeeSubject.error(error);
  //   }
  // }

  getEmployees() {
    console.log('GETTING EMPLOYEES FROM SERVICE...');
    return this.employees;
  }

  setEmployee(employee: Employee) {
    this.employeesSource.next(employee);
  }

  addEmployee(employees: Employee): void {
    for (const employee of [employees]) {
      this.employees.push(employee);
    }
  }

  saveEmployee(employee) {
    this.employees = employee;
  }
}
