import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project []

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(project => {
      this.projects = project;
    });
  }

  onView(index){
    // const viewProject ={
    //   id: this.projects[index].id,
    //   projectProfile: this.projects[index].projectProfile,
    //   projectCost: this.projects[index].projectCost
    //   }
      this.projectService.selectedToView = index;
       console.log(this.projectService.selectedToView)
       console.log(this.projects[this.projectService.selectedToView])
  }
}
