import { Injectable } from '@angular/core';
import { Project } from './project';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  selected;



  public projectSource = new BehaviorSubject<Project>({
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
  });

  selectedProject = this.projectSource.asObservable();

  constructor() {
    this.selected = [],
    this.projects = [
      {
        id: 'c8e6449f-ae5d-499c-937b-18277338d1e1',
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
          projectType: 'fa fa-hospital-o fa-lg',
          address:{
            province:'Batangas',
            municipality:'Bauan',
            barangay: 'Manghinao proper'
          },
          totalCost: 123124,
          disbursement: [{
              cost: '123124',
              date: '1997-07-23',
          }]
      },    
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
