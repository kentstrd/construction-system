import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

import { Employee } from '../models/Employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employeeSubject: Subject<any> = new Subject();
  employees: Employee[];

  private employeeUpdated = new Subject<Employee[]>();
  public employeesSource = new BehaviorSubject<Employee>({
    id: null,
    firstName: null,
    lastName: null,
    gender: null,
    skill: null,
    addresses: null,
    contacts: null
  });

  selectedEmployee = this.employeesSource.asObservable();

  constructor(private http: HttpClient) {
    // this.employees = [
    //   {
    //     id: '1',
    //     firstName: 'John',
    //     lastName: 'Cena',
    //     gender: 'Male',
    //     skill: 'Carpenter',
    //     addresses: [{ homeaddress: 'Manila' }, { homeaddress: 'Pasay' }],
    //     contacts: [{ homenumber: '09209218201' }, { homenumber: '09292927152' }]
    //   },
    //   {
    //     id: '2',
    //     firstName: 'Sarah',
    //     lastName: 'Smith',
    //     gender: 'Female',
    //     skill: 'Mason',
    //     addresses: [{ homeaddress: 'Mindoro' }, { homeaddress: 'Batangas' }],
    //     contacts: [{ homenumber: '09230291261' }, { homenumber: '09212532622' }]
    //   }
    // ];
  }

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  getEmployees() {
    this.http
      .get<{ message: string; employee: Employee[] }>('http://localhost:3000/api/employee')
      .subscribe(employee => {
        this.employees = employee.employee;
        this.employeeUpdated.next([...this.employees]);
        console.log([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }

  setEmployee(employee: Employee) {
    this.employeesSource.next(employee);
  }

  addEmployee(employees: Employee): void {
    for (const employee of [employees]) {
      this.employees.unshift(employee);
    }
  }

  // add employee to mongoDB
  addEmployeeToDB(
    firstname: string,
    lastName: string,
    gender: string,
    skill: string,
    addresses: any,
    contacts: any
  ) {
    const employee: Employee = {
      id: null,
      firstName: firstname,
      lastName: lastName,
      gender: gender,
      skill: skill,
      addresses: addresses,
      contacts: contacts
    };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/employee', employee)
      .subscribe(employeeRespData => {
        console.log([employeeRespData]);
        this.employees.push(employee);
        this.employeeUpdated.next([...this.employees]);
      });
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
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
