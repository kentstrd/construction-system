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
        lastName: 'brothers',
        birthDate: new Date('1/23/1901'),
        Gender: 'Male',
        skills: ['Malandi', 'masiapg uminom', 'talented'],
        contacts: ['09126322', '0926672711', '091238422'],
        address: ['town province', 'town', 'korea']
      },
      {
        id: '2',
        firstName: 'mekloks',
        lastName: 'joklom',
        birthDate: new Date('12/22/1903'),
        Gender: 'Female',
        skills: ['lakas tumalon', 'kindat', 'giling'],
        contacts: ['0912209222', '091110992', '0912384621'],
        address: ['Ghost Town', 'England', 'Africa']
      },
      {
        id: '3',
        firstName: 'john',
        lastName: 'doe',
        birthDate: new Date('12/22/1920'),
        Gender: 'Male',
        skills: ['lakas matulog', 'gulong gulong', 'ngiti'],
        contacts: ['09202200912', '0929112011'],
        address: ['Mindanao, Dubai']
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
