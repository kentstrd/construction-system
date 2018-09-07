import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../employee/services/employee.service';
import { ProjectService } from '../../../../project-management/project.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
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
    return ["","Skill", "Name", "gender", "address","contact"]
  }

  getProjectHeaders(): string[]{
    return ["","Project Name", "Project Type", "Address", "Project Cost","Date Started"]
  }

  view(item){
    this.projectService.setProject(item)
  }

}
