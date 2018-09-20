import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Subscription } from 'rxjs';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items;
  tableHeaders = ['', '', 'Skill', 'Name', 'gender', 'address', 'contact'];
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
