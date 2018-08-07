import { Injectable } from '@angular/core';
import { Project } from './project';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  selected;



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
    this.selected = [],
    this.projects = [
      {
        id: 'c8e6449f-ae5d-499c-937b-18277338d1e1',
        projectProfile: {
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
      },
        projectCost: {
          totalCost: 123124,
          disbursement: {
              cost: '123124',
              date: '1997-07-23',
          }
      }
    },
    {
      id: '0cc2a380-fed8-4741-bc77-33f65c88cfc7',
      projectProfile: {
        projectName: 'Building Project',
        description: 'Building Project no.2',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
    },
      projectCost: {
        totalCost: 123124,
        disbursement: {
            cost: '123124',
            date: '1997-07-13',
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
  updateProject(project: Project) {
    this.projects.forEach((current, index) => {
      if (project.id === current.id) {
        this.projects[index] = project
      }
    });
  }
}
