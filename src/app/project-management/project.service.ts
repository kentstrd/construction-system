import { Injectable } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateDisbursements } from './disbursements.validator';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  isReadonly: boolean = false;
  projectForm: FormGroup;
  patternForPesoValidation;

  private projectUpdated = new Subject<Project[]>();

  public projectSource = new BehaviorSubject<Project>({
    id: null,
    projectName: null,
    description: null,
    dateStarted: null,
    dateEnded: null,
    projectType: null,
    address: {
      province: null,
      municipality: null,
      barangay: null
    },
    costDetails: {
      totalCost: null,
      disbursement: [
        {
          cost: null,
          date: null
        }
      ]
    }
  });

  selectedProject = this.projectSource.asObservable();

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

  projectTypeGenerateIcon(icon) {
    if (icon === 'Building') {
      return 'fa fa-building fa-lg';
    } else if (icon === 'Local Access Road') {
      return 'fa fa-road fa-lg';
    } else if (icon === 'Hospital') {
      return 'fa fa-hospital-o fa-lg';
    }
  }

  setProject(project: Project) {
    this.projectSource.next(project);
  }

  addProject(project: Project) {
    this.projects.unshift(project);
    // this.projects.
  }

  // get projects from DB
  getProjectsfromDB() {
    this.http
      .get<{ message: string; project: any }>('http://localhost:3000/api/project')
      .pipe(
        map(projectData => {
          return projectData.project.map(project => {
            return {
              id: project._id,
              projectName: project.projectName,
              description: project.description,
              dateStarted: project.dateStarted,
              dateEnded: project.dateEnded,
              address: {
                province: project.address,
                municipality: project.address,
                barangay: project.address
              },
              costDetails: {
                totalCost: project.costDetails.totalCost,
                disbursement: [
                  {
                    cost: project.costDetails.disbursement.cost,
                    date: project.costDetails.disbursement.date
                  }
                ]
              }
            };
          });
        })
      )
      .subscribe(project => {
        this.projects = project;
        this.projectUpdated.next([...this.projects]);
        console.log([...this.projects]);
      });
  }

  deleteProject(projectId: string) {
    this.http.delete('http://localhost:3000/api/employee/' + projectId).subscribe(() => {
      console.log('DELETED!!');
      const fetchedProject = this.projects.filter(projects => projects.id !== projectId);
      this.projects = fetchedProject;
      this.projectUpdated.next([...this.projects]);
    });
  }

  // add employee to mongoDB
  addProjectToDB(projectModel: any) {
    const project: Project = {
      id: 'null',
      projectName: projectModel.projectName,
      description: projectModel.description,
      dateStarted: projectModel.dateStarted,
      dateEnded: projectModel.dateEnded,
      projectType: projectModel.projectType,
      address: {
        province: projectModel.address.province,
        municipality: projectModel.address.municipality,
        barangay: projectModel.address.barangay
      },
      costDetails: {
        totalCost: projectModel.costDetails.totalCost,
        disbursement: [
          {
            cost: projectModel.costDetails.disbursement,
            date: projectModel.costDetails.disbursement
          }
        ]
      }
    };
    this.http
      .post<{ message: string; projectId: string }>('http://localhost:3000/api/project', project)
      .subscribe(projectRespData => {
        const projectId = projectRespData.projectId;
        project.id = projectId;
        this.projectUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectUpdated.asObservable();
  }

  getProjects() {
    return this.projects;
  }
  updateProject(project: Project) {
    this.projects.forEach((current, index) => {
      if (project.id === current.id) {
        this.projects[index] = project;
      }
    });
  }
}
