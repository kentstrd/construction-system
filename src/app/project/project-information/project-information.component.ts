import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  formProps = [];
  public projectForm: FormGroup;
  isNew: boolean = true;
  data:{};
  ProjectType;
  

  constructor( private fb: FormBuilder, 
               private projectService: ProjectService, 
               public router: Router) { 
            }

  ngOnInit() {
    this.projectForm = this.fb.group({
        projectName: [''],
        description:[''],
        dateStarted:[''],
        dateEnded:[''],
        projectType:[''],
        address:this.fb.group({
          province:[''],
          municipality:[''],
          barangay:[''],
        }),
        totalCost:[''],
        disbursement: this.fb.array([]),
      }),
    this.addDisbursement();
    this.projectService.selectedProject.subscribe(project => {
      if (project.id != null) {
        this.isNew = false;
        this.projectForm = this.fb.group({
          id: project.id,
          projectName: project.projectName,
          description: project.description,
          dateStarted: project.dateStarted,
          dateEnded: project.dateEnded,
          projectType: project.projectType,
            address:this.fb.group({
              province: project.address.province,
              municipality: project.address.municipality,
              barangay: project.address.barangay
            }),
          totalCost: project.totalCost,
          disbursement: this.fb.array([])
        })
        if(project.disbursement.length == undefined){
          this.disbursements.push(this.fb.group(project.disbursement))
         }else{
           project.disbursement.forEach(element => {
             this.disbursements.push(this.fb.group(element))
           });
         };
      }
    });
  }
  
  get disbursements(){
    return this.projectForm.get('disbursement') as FormArray
  }

  addDisbursement(){
    const disbursement = this.fb.group({
      cost: [''],
      date: ['']
      })
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }


  onSubmit(){
    const newProject ={
      id: this.generateId(),
      projectName: this.projectForm.value.projectName,
      description: this.projectForm.value.description,
      dateStarted: this.projectForm.value.dateStarted,
      dateEnded: this.projectForm.value.dateEnded,
      projectType: this.projectForm.value.projectType,
      address: this.projectForm.value.address,
      totalCost: this.projectForm.value.totalCost,
      disbursement: this.projectForm.value.disbursement
      }
      this.projectService.addProject(newProject);
      this.router.navigate(['/project'])
    }
    generateId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }

  




