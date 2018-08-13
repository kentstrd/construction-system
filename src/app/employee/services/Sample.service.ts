import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Employee, Address, Contact } from '../models/sample';

@Injectable({
  providedIn: 'root'
})
export class SampleServices {
  public employeeSubject: Subject<any> = new Subject();
  employees: Employee[];

  public employeesSource = new BehaviorSubject<Employee>({
    id: null,
    firstName: null,
    lastName: null,
    gender: null,
    skill: null,
    address: null,
    contact: null
  });

  selectedEmployee = this.employeesSource.asObservable();
  // store = this.employeeSubject.asObservable();

  constructor() {
    this.employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Cena',
        gender: 'Male',
        skill: 'SMART',
        address: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }],
        contact: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }]
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Smith',
        gender: 'Female',
        skill: 'STRONG',
        address: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }],
        contact: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }]
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
    return this.employees;
  }

  setEmployee(employee: Employee) {
    this.employeesSource.next(employee);
  }

  addEmployee(employees: Employee): void {
    for (const employee of [employees]) {
      this.employees.unshift(employee);
    }
  }

  saveEmployee(employee) {
    this.employees = employee;
  }
}
