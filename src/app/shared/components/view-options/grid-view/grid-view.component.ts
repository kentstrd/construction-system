import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../project/project.service';
import { EmployeeService } from '../../../../employee/services/employee.service';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  // projects: Project [];
  items;
  @Input() mode;
  // activatedRoute: ActivatedRoute
  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private employeeService: EmployeeService) {
    // this.activatedRoute = ActivatedRoute
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
