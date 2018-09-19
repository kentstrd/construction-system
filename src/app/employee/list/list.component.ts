import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items;
  tableHeaders;
  p: number = 0;

  constructor(private emmployeeService: EmployeeService) {}

  ngOnInit() {
    this.items = this.getItems();
    this.tableHeaders = this.getHeaders();
  }

  getItems() {
    return this.emmployeeService.getEmployees();
  }
  getHeaders() {
    return ['', '', 'Skill', 'Name', 'gender', 'address', 'contact'];
  }
}
