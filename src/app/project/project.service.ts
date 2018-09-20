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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.patternForPesoValidation = /^[0-9₱,.]*$/;

    this.projectForm = this.fb.group({
      id: [''],
      projectName: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      projectType: ['', Validators.required],
      address: this.fb.group(
        {
          province: ['', Validators.required],
          municipality: ['', Validators.required],
          barangay: ['', Validators.required]
        },
        Validators.required
      ),
      dateStarted: ['', Validators.required],
      dateEnded: ['', Validators.required],
      costDetails: this.fb.group(
        {
          totalCost: [
            '',
            [
              Validators.pattern(this.patternForPesoValidation),
              Validators.minLength(4),
              Validators.required
            ]
          ],
          disbursement: this.fb.array([
            this.fb.group({
              cost: ['', [Validators.pattern(this.patternForPesoValidation)]],
              date: ['']
            })
          ])
        },
        { validator: ValidateDisbursements }
      )
    });
  }

  // get projects from DB
  getProjects() {
    this.http
      .get<{ message: string; project: any }>('http://localhost:3002/api/project')
      .subscribe(project => {
        this.projects = project.project;
        this.projectUpdated.next([...this.projects]);
        console.log([...this.projects]);
      });
  }

  deleteProject(projectId: string) {
    this.http.delete('http://localhost:3002/api/project/' + projectId).subscribe(() => {
      console.log('DELETED!!');
      const fetchedProject = this.projects.filter(projects => projects._id !== projectId);
      this.projects = fetchedProject;
      this.projectUpdated.next([...this.projects]);
    });
  }

  // add employee to mongoDB
  addProjectToDB(project: Project) {
    this.http
      .post<{ message: string; projectId: string }>('http://localhost:3002/api/project', project)
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
    this.projects.forEach((current, index) => {
      if (project._id === current._id) {
        this.projects[index] = project;
      }
    });
  }
}
