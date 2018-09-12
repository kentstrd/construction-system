import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  items;
  p: number = 0;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.items = this.getItems();
  }

  getItems() {
    return this.Projects;
  }

  get Projects() {
    return this.projectService.getProjects();
  }
}
