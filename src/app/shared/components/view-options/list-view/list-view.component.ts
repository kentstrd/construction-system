import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../project/project.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../employee/services/employee.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
items;
tableHeaders;



  constructor(private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      this.items = this.getItems(url)
      this.tableHeaders = this.getHeaders(url)
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
  getHeaders(chosenRoute){
    if(chosenRoute == 'project'){
      return this.getProjectHeaders()
    }else{
      return this.getEmployeeHeaders()
    }
  }
  
  get Projects(){
    return this.projectService.getProjects();
  }

  get Employees(){
    return this.employeeService.getEmployees();
  }

  getEmployeeHeaders(): string[]{
    return ["first Name", "last Name", "skill", "address","contact"]
  }

  getProjectHeaders(): string[]{
    return ["Project Name", "Project Type", "Address", "Project Cost","Date Started"]
  }

}
