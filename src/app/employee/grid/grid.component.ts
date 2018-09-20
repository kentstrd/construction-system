import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  items;
  p: number = 0;
  private EmployeePeps: Subscription;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getItems();
    this.EmployeePeps = this.employeeService
      .getEmployeeUpdateListener()
      .subscribe((employee: Employee[]) => {
        this.items = employee;
      });
  }

  getItems() {
    return this.employeeService.getEmployees();
  }
}
