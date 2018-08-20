import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employeeSubject: Subject<any> = new Subject();
  employees: Employee[];

  public employeesSource = new BehaviorSubject<Employee>({
    id: null,
    firstName: null,
    lastName: null,
    gender: null,
    skill: null,
    addresses: null,
    contacts: null
  });
  public text: string = 'Update';

  selectedEmployee = this.employeesSource.asObservable();

  constructor() {
    this.employees = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Cena',
        gender: 'Male',
        skill: 'Athlete',
        addresses: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }],
        contacts: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }]
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Smith',
        gender: 'Female',
        skill: 'Singer',
        addresses: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }],
        contacts: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }]
      }
    ];
  }

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

  update(employee: Employee) {
    this.employees.forEach((current, index) => {
      if (employee.id === current.id) {
        this.employees[index] = employee;
      }
    });
  }
  s;

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
