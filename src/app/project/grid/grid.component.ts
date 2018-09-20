import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  items;
  p: number = 0;
  private projectPep: Subscription;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.getItems();
    this.projectPep = this.projectService
      .getProjectUpdateListener()
      .subscribe((project: Project[]) => {
        this.items = project;
      });
  }

  getItems() {
    return this.projectService.getProjects();
  }
}
