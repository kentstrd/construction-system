import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  employee;

  constructor(public employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employee = this.employeeService.getEmployees();
  }

  // onSelect(employee: Employee) {
  //   this.employeeService.setEmployee(employee);
  // }
}
