import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[];

  employee;
  private EmployeePeps: Subscription;
  constructor(public employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employee = this.employeeService.getEmployees();
    this.EmployeePeps = this.employeeService
      .getEmployeeUpdateListener()
      .subscribe((employee: Employee[]) => {
        console.log((this.employee = employee));
        const employeeResponseProps = Object.keys(employee);
        const employeeResponse = [];
        for (const prop of employeeResponseProps) {
          employeeResponse.unshift(employeeResponse[prop]);
        }
      });
  }

  ngOnDestroy() {
    this.EmployeePeps.unsubscribe();
  }

  onDelete(employeeId: string) {
    this.employeeService.deleteEmployee(employeeId);
  }

  onSelect(employee: Employee) {
    this.employeeService.setEmployee(employee);
  }
}
