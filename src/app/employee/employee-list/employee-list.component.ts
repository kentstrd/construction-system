import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/Employee';
import { SampleServices } from '../services/Sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  employee;

  constructor(public sampleService: SampleServices, private router: Router) {}

  ngOnInit() {
    this.employee = this.sampleService.getEmployees();
  }

  onSelect(employee: Employee) {
    this.sampleService.setEmployee(employee);
  }
}
