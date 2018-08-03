import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeDetailsService } from '../services/Employee-details.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeDetailsService: EmployeeDetailsService) {}

  ngOnInit() {
    this.employeeDetailsService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
  onSelect(employee: Employee) {
    this.employeeDetailsService.setFormEmployee(employee);
    console.log(employee);
  }
}
