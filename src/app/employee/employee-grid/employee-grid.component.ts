import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.scss']
})
export class EmployeeGridComponent implements OnInit {
  items;
  response: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get('').subscribe(response => {
      this.response = response;
      console.log(this.response);
    });
  }

  get Employees() {
    return this.employeeService.getEmployees();
  }

  getEmployeeItems(chosenRoute) {
    if (chosenRoute === 'employee') {
      return this.Employees;
    }
  }
}
