import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../employee/services/employee.service';
import { ProjectService } from '../../../../project-management/project.service';

@Component({
  selector: 'app-layout-view',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss']
})
export class GridLayoutComponent implements OnInit {
  items;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private employeeService: EmployeeService) {
   }

  ngOnInit() {
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      this.items = this.getItems(url)
    })
  }

  getItems(chosenRoute){
    console.log(chosenRoute)
    if(chosenRoute == 'project'){
      return this.Projects
    }else{
      return this.Employees
    }
  }
  
  get Projects(){
    return this.projectService.getProjects();
  }

  get Employees(){
    return this.employeeService.getEmployees();
  }
}
