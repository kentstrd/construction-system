import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Subscription } from 'rxjs';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items;
  tableHeaders;
  p: number = 0;
  private projectPeps: Subscription;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.items = this.getItems();
    this.projectPeps = this.projectService
      .getProjectUpdateListener()
      .subscribe((project: Project[]) => {
        this.items = project;
      });
    this.tableHeaders = this.getHeaders();
  }

  getItems() {
    return this.Projects;
  }
  getHeaders() {
    return ['', '', 'Project Name', 'Project Type', 'Address', 'Project Cost', 'Date Started'];
  }

  get Projects() {
    return this.projectService.getProjects();
  }
}
