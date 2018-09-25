import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../models/Employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public employeeSubject: Subject<any> = new Subject();
  employees: Employee[];

  private employeeUpdated = new Subject<Employee[]>();

  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  getEmployees() {
    this.http
      .get<{ message: string; employee: Employee[] }>('http://localhost:3000/api/employee')
      .subscribe(resultData => {
        this.employees = resultData.employee;
        this.employeeUpdated.next(resultData.employee);
        // console.log([...this.employees]);
      });
  }

  getEmployeeUpdateListener() {
    return this.employeeUpdated.asObservable();
  }

  addEmployee(employees: Employee): void {
    for (const employee of [employees]) {
      this.employees.unshift(employee);
    }
  }
  // add employee to mongoDB
  addEmployeeToDB(employee: Employee) {
    this.http
      .post<{ message: string; employeeId: string }>('http://localhost:3000/api/employee', employee)
      .subscribe(employeeRespData => {
        const employeeId = employeeRespData.employeeId;
        employee._id = employeeId;
        this.employeeUpdated.next([employee, ...this.employees]);
      });
  }

  // DELETE EMPLOYEE FROM DB
  deleteEmployee(employeeId: string) {
    this.http.delete('http://localhost:3000/api/employee/' + employeeId).subscribe(() => {
      console.log('DELETED!!');
      const updatedEmployee = this.employees.filter(employee => employee._id !== employeeId);
      this.employees = updatedEmployee;
      this.employeeUpdated.next([...this.employees]);
    });
  }

  updateEmployee(employee: Employee) {
    console.log(employee._id);
    this.http
      .patch('http://localhost:3000/api/employee/' + employee._id, employee)
      .subscribe(() => {
        console.log('EDITED!!');
        const fetchEmployee = this.employees.filter(employees => employees._id !== employee._id);
        this.employees = fetchEmployee;
        this.employeeUpdated.next([...this.employees]);
      });
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
