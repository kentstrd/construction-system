import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employeeSubject: Subject<any> = new Subject();
  employees: Employee[];

  constructor() {
    this.employees = [
      {
        id: '1',
        fullname: {
          firstName: 'John',
          lastName: 'Cena'
        },
        gender: 'Male',
        skill: 'Carpenter',
        addresses: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }],
        contacts: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }]
      },
      {
        id: '2',
        fullname: {
          firstName: 'John',
          lastName: 'Cena'
        },
        gender: 'Female',
        skill: 'Mason',
        addresses: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }],
        contacts: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }]
      }
    ];
  }

  getEmployees() {
    return this.employees;
  }

  addEmployee(employees: Employee): void {
    for (const employee of [employees]) {
      this.employees.unshift(employee);
    }
  }

  updateEmployee(employee: Employee) {
    this.employees.forEach((current, index) => {
      if (employee.id === current.id) {
        this.employees[index] = employee;
      }
    });
  }

  saveEmployee(employee) {
    this.employees = employee;
  }
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
