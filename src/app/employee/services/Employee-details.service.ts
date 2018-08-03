import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeDetailsService {
  employees: Employee[];

  public employeesSource = new BehaviorSubject<Employee>({
    id: null,
    firstName: null,
    lastName: null,
    birthDate: null,
    Gender: null,
    skills: null,
    contacts: null,
    address: null
  });

  selectedEmployee = this.employeesSource.asObservable();

  constructor() {
    this.employees = [
      {
        id: '1',
        firstName: 'Jonas',
        lastName: 'bonax',
        birthDate: new Date('1/23/1901'),
        Gender: 'Male',
        skills: ['lakas matulog', 'atargek', 'anoks'],
        contacts: ['12312312312', '213123', '12321312312'],
        address: ['ageek town', 'meshlokasdsad', 'asdasasd']
      },
      {
        id: '2',
        firstName: 'mekloks',
        lastName: 'joklom',
        birthDate: new Date('12/22/1903'),
        Gender: 'Female',
        skills: ['lakas matulog', 'atargek', 'meloks'],
        contacts: ['12312312312', '213123', '12321312312'],
        address: ['ageek town', 'meshlokasdsad', 'asdasasd']
      },
      {
        id: '3',
        firstName: 'jomlom',
        lastName: 'mesloks',
        birthDate: new Date('12/22/1920'),
        Gender: 'male',
        skills: ['lakas matulog', 'atargek', 'meloks'],
        contacts: ['12312312312', '213123', '12321312312'],
        address: ['ageek town', 'meshlokasdsad', 'asdasasd']
      }
    ];
  }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  setFormEmployee(employees: Employee) {
    this.employeesSource.next(employees);
  }

  addEmployee(employee: Employee) {
    this.employees.unshift(employee);
  }
  updateEmployee(employee: Employee) {
    this.employees.forEach((current, index) => {
      if (employee.id === current.id) {
        this.employees.splice(index, 1);
      }
    });
    this.employees.unshift();
  }
}
