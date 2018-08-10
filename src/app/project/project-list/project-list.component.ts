import { Component, OnInit } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { BehaviorSubject } from 'rxjs';
import { ProjectInformationComponent } from '../project-information/project-information.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project [];
  selectedProject;
  projectFormComponent: ProjectInformationComponent

  constructor(private projectService: ProjectService, 
              public router:Router,
              private fb: FormBuilder) {
    this.selectedProject = this.projectService.projectSource
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(project => {
      this.projects = project;
    });
  }

  onEdit(index){
    this.projectService.selected = this.projects[index];
  }
  newProject(){
    this.projectService.projectSource.next({
      id: null,
      projectName: null,
      description: null,
      dateStarted: null,
      dateEnded: null,
      projectType: null,
      address:{
        province:null,
        municipality: null,
        barangay: null
      },
      totalCost: null,
      disbursement: [{
            cost: null,
            date: null,
        }]
    })
    this.router.navigate(['project/form'])
  }

  onView(index){
    // const viewProject ={
    //   id: this.projects[index].id,
    //   projectProfile: this.projects[index].projectProfile,
    //   projectCost: this.projects[index].projectCost
    //   }
      this.projectService.projectSource.next(this.projects[index])
  }
}
