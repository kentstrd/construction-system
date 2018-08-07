import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form-view',
  templateUrl: './project-form-view.component.html',
  styleUrls: ['./project-form-view.component.scss']
})
export class ProjectFormViewComponent implements OnInit {
selectedProject;

  constructor(private projectService: ProjectService) {
   }

  ngOnInit() {
    this.selectedProject = this.projectService.selected;
  }

}
