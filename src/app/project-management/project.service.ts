import { Injectable } from '@angular/core';
import { Project } from './project';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidateDisbursements } from './disbursements.validator';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[];
  isReadonly: boolean = false;
  projectForm: FormGroup;
  patternForPesoValidation;

  

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
    costDetails:{
      totalCost: null,
      disbursement: [{
        cost: null,
        date: null
      }]
    }
  });

  selectedProject = this.projectSource.asObservable();

  constructor(private fb: FormBuilder) {
    this.patternForPesoValidation = /^[0-9₱,.]*$/

    this.projectForm = this.fb.group({
      id:[''],
      projectName: ['',[Validators.required,Validators.minLength(4)]],
      description:['',[Validators.required,Validators.minLength(30)]],        
      projectType:['', Validators.required],
      address:this.fb.group({
        province:['',Validators.required],
        municipality:['',Validators.required],
        barangay:['',Validators.required],
      },Validators.required),
      dateStarted:['',Validators.required],
      dateEnded:['',Validators.required],
      costDetails:this.fb.group({
        totalCost:['',[Validators.pattern(this.patternForPesoValidation),
                       Validators.minLength(4),
                       Validators.required]],
        disbursement: this.fb.array([
              this.fb.group({
                cost: ['',[Validators.pattern(this.patternForPesoValidation)]],
                date: ['']            
          })
        ])
      },{validator: ValidateDisbursements})
    })

    this.projects = [
      {
        id: 'c8e6449f-ae5d-499c-937b',
          projectName: 'Building Project',
          description: 'Building Project no.1 Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
          projectType: 'Building',
          address:{
            province:'Batangas',
            municipality:'Bauan',
            barangay: 'Manghinao proper'
          },
          costDetails:{
            totalCost: '₱123,124.00',
            disbursement: [{
                cost: '₱123,124.00',
                date: '1997-07-23',
            }]
          }
      },
      {
        id: 'c8e6449f-ae5d-499c-937b-13277338d1e1',
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
          projectType: 'Local Access Road',
          address:{
            province:'Batangas',
            municipality:'Bauan',
            barangay: 'Manghinao proper'
          },
          costDetails:{
            totalCost: '₱123,124.00',
            disbursement: [{
                cost: '₱123,124.00',
                date: '1997-07-23',
            }]
          }
      },
      {
        id: 'c8e6449f-ae5d-499c-937b-18257338d1e1',
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
          projectType: 'Hospital',
          address:{
            province:'Batangas',
            municipality:'Bauan',
            barangay: 'Manghinao proper'
          },
          costDetails:{
            totalCost: '₱123,124.00',
            disbursement: [{
                cost: '₱123,124.00',
                date: '1997-07-23',
            }]
          }
      },
      {
        id: 'c8e6449f-ae5d-499c-937b-18277338d1w1',
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
          projectType: 'Building',
          address:{
            province:'Batangas',
            municipality:'Bauan',
            barangay: 'Manghinao proper'
          },
          costDetails:{
            totalCost: '₱123,124.00',
            disbursement: [{
                cost: '₱123,124.00',
                date: '1997-07-23',
            }]
          }
      },
      {
        id: 'c8e6449f-ae5d-499c-937b-18277338d1e2',
          projectName: 'Building Project',
          description: 'Building Project no.1',
          dateStarted: '1997-07-13',
          dateEnded: '2001-01-17',
          projectType: 'Hospital',
          address:{
            province:'Batangas',
            municipality:'Bauan',
            barangay: 'Manghinao proper'
          },
          costDetails:{
            totalCost: '₱123,124.00',
            disbursement: [{
                cost: '₱123,124.00',
                date: '1997-07-23',
            }]
          }
      },                    
    ]
   }

   projectTypeGenerateIcon(icon){

    if(icon === 'Building'){
      return "fa fa-building fa-lg"
    }else if(icon === 'Local Access Road'){
      return "fa fa-road fa-lg"
    }else if(icon === 'Hospital'){
      return "fa fa-hospital-o fa-lg"
    }
  }


  setProject(project: Project) {
    this.projectSource.next(project);
  }

  addProject(project: Project) {
    this.projects.unshift(project);
    // this.projects.
  }
  getProjects(){
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
