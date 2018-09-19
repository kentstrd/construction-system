import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  items;
  p: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.items = this.getItems();
  }

  getItems() {
    return this.employeeService.getEmployees();
  }
}
