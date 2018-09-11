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
        this.employee = employee;
      });
  }

  ngOnDestroy() {
    this.EmployeePeps.unsubscribe();
  }

  onSelect(employee: Employee) {
    this.employeeService.setEmployee(employee);
  }
}
