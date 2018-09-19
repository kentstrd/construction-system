import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];

  constructor() {
    this.projects = [
      {
        id: 'c8e6449f-ae5d-499c-a937b',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'c8e6449f-ae5d-499c-9d37b',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'c8e6449f-ae5d-499c-93f7b',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'c8e6449f-ae5d-499c-937gb',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'c8e6449f-ae5d-499c-937bz',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'c8e6449f-ae5d-499c-937bs',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'c8e6449f-ae5d-499c-937be',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      },
      {
        id: 'tc8e6449f-ae5d-499c-937b',
        projectName: 'Building Project',
        description: 'Building Project no.1 Building Project no.1',
        dateStarted: '1997-07-13',
        dateEnded: '2001-01-17',
        projectType: 'Building',
        address: {
          province: 'Batangas',
          municipality: 'Bauan',
          barangay: 'Manghinao proper'
        },
        costDetails: {
          totalCost: '₱123,124.00',
          disbursement: [
            {
              cost: '₱123,124.00',
              date: '1997-07-23'
            }
          ]
        }
      }
    ];
  }

  addProject(project: Project) {
    this.projects.unshift(project);
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
