import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-form-view',
  templateUrl: './project-form-view.component.html',
  styleUrls: ['./project-form-view.component.scss']
})
export class ProjectFormViewComponent implements OnInit {
projects: Project [];
selectedIndex;
disbursements;

  constructor(private projectService: ProjectService) {
    this.selectedIndex = this.projectService.selectedToView;
    this.disbursements = []
   }

  ngOnInit() {
    this.projectService.getProjects().subscribe(project => {
      this.projects = project;
    });
    this.disbursements = this.projects[this.selectedIndex].projectCost.disbursement
    console.log(this.disbursements.length)
  }

}
