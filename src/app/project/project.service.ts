import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateDisbursements } from './disbursements.validator';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  isReadonly: boolean = false;
  projectForm: FormGroup;
  patternForPesoValidation;

  private projectUpdated = new Subject<Project[]>();

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  // get projects from DB
  getProjects() {
    this.http
      .get<{ message: string; project: any }>('http://localhost:3000/api/project')
      .subscribe(project => {
        this.projects = project.project;
        this.projectUpdated.next([...this.projects]);
      });
  }

  deleteProject(projectId: string) {
    this.http.delete('http://localhost:3000/api/project/' + projectId).subscribe(() => {
      console.log('DELETED!!');
      const fetchedProject = this.projects.filter(projects => projects._id !== projectId);
      this.projects = fetchedProject;
      this.projectUpdated.next([...this.projects]);
    });
  }

  // add employee to mongoDB
  addProjectToDB(project: Project) {
    this.http
      .post<{ message: string; projectId: string }>('http://localhost:3000/api/project', project)
      .subscribe(projectRespData => {
        const projectId = projectRespData.projectId;
        project._id = projectId;
        this.projectUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectUpdated.asObservable();
  }
  updateProject(project: Project) {
    console.log(project._id);
    this.http.patch('http://localhost:3000/api/project/' + project._id, project).subscribe(() => {
      console.log('EDITED!!');
      const fetchedProject = this.projects.filter(projects => projects._id !== project._id);
      this.projects = fetchedProject;
      this.projectUpdated.next([...this.projects]);
    });
  }
}
