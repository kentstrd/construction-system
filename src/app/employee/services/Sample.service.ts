import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Employee } from '../models/sample';

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
        address: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }],
        contact: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }]
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Smith',
        gender: 'Female',
        skill: 'Singer',
        address: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }],
        contact: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }]
      }
    ];
  }

  getEmployees() {
    return this.employees;
  }

  setEmployee(employee: Employee) {
    this.employeesSource.next(employee);
  }

  changeText(): void {
    if (this.text === 'Save') {
      this.text = 'Update';
    } else {
      this.text = 'Save';
    }
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

  saveEmployee(employee) {
    this.employees = employee;
  }
}
