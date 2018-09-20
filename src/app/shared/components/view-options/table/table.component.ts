import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../employee/services/employee.service';
import { ProjectService } from '../../../../project-management/project.service';
import { Project } from '../../../../project-management/project';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  items;
  tableHeaders;
  p: number = 0;
  project;

  private projectPeps: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.url.subscribe(urlPath => {
      const url = urlPath[urlPath.length - 1].path;
      this.items = this.getItems(url);
      this.tableHeaders = this.getHeaders(url);
    });
    this.projectService.getProjectsfromDB();
    this.projectPeps = this.projectService
      .getProjectUpdateListener()
      .subscribe((project: Project[]) => {
        console.log((this.project = project));
        const projectResponseProps = Object.keys(project);
        const projectResponse = [];
        for (const prop of projectResponseProps) {
          projectResponse.unshift(projectResponse[prop]);
        }
        console.log(123);
      });
  }

  ngOnDestroy() {
    this.projectPeps.unsubscribe();
  }

  getItems(chosenRoute) {
    if (chosenRoute === 'project') {
      return this.Projects;
    } else {
      return this.Employees;
    }
  }
  getHeaders(chosenRoute) {
    if (chosenRoute === 'project') {
      return this.getProjectHeaders();
    } else {
      return this.getEmployeeHeaders();
    }
  }

  get Projects() {
    return this.projectService.getProjectsfromDB();
  }

  get Employees() {
    return this.employeeService.getEmployees();
  }

  getEmployeeHeaders(): string[] {
    return ['', 'Skill', 'Name', 'gender', 'address', 'contact'];
  }

  getProjectHeaders(): string[] {
    return ['', 'Project Name', 'Project Type', 'Address', 'Project Cost', 'Date Started'];
  }

  view(item) {
    if (this.items === this.projectService.getProjects()) {
      this.projectService.setProject(item);
    } else {
      this.employeeService.setEmployee(item);
    }
  }
}
