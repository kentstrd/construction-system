import { Injectable } from '@angular/core';
import { Project } from './project';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  selectedToView;
  project:{};



  public projectSource = new BehaviorSubject<Project>({
    id: null,
    projectProfile: {
      projectName: null,
      description: null,
      dateStarted: null,
      dateEnded: null,
  },
    projectCost: {
      totalCost: null,
      disbursement: {
          cost: null,
          date: null,
      }
    }
  });

  selectedProject = this.projectSource.asObservable();

  constructor() {
    this.project={
      projectName:'building project',
      age:'12'
    }
    this.selectedToView = '',
    this.projects = [
      {
        id: 'c8e6449f-ae5d-499c-937b-18277338d1e1',
        projectProfile: {
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: new Date('1/23/1901'),
          dateEnded: new Date('1/23/1902'),
      },
        projectCost: {
          totalCost: 123124,
          disbursement: {
              cost: '123124',
              date: new Date('1/23/1901'),
          }
      }
    },
    {
      id: '0cc2a380-fed8-4741-bc77-33f65c88cfc7',
      projectProfile: {
        projectName: 'Building Project',
        description: 'Building Project no.2',
        dateStarted: new Date('1/23/1901'),
        dateEnded: new Date('1/23/1902'),
    },
      projectCost: {
        totalCost: 123124,
        disbursement: {
            cost: '123124',
            date: new Date('1/23/1901'),
        }
       }
     }
    ]
   }


  addProject(project: Project) {
    this.projects.unshift(project);
  }
  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
