import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/sample';
import { SampleServices } from '../services/Sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
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
