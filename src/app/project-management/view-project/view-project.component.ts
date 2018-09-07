import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectTypeGenerateIcon;
  projectTypeOptions;

  constructor( private fb: FormBuilder, 
               private projectService: ProjectService, 
               public router: Router) 
      {
       this.projectTypeGenerateIcon = projectService.projectTypeGenerateIcon
       this.projectTypeOptions = ['Building', 'Local Access Road', 'Hospital']
       
       this.projectForm = this.fb.group({
        id:[''],
        projectName: [{value: null , disabled: true}],
        description:[{value: null , disabled: true}],        
        projectType:[{value: null , disabled: true}],
        address:this.fb.group({
          province:[{value: null , disabled: true}],
          municipality:[{value: null , disabled: true}],
          barangay:[{value: null , disabled: true}],
        }),
        dateStarted:[{value: null , disabled: true}],
        dateEnded:[{value: null , disabled: true}],
        costDetails:this.fb.group({
          totalCost:[{value: null , disabled: true}],
          disbursement: this.fb.array([])
        },)
      })

      }

  ngOnInit() {
    this.projectService.selectedProject.subscribe(project => {
      if (project.id != null) {
          project.costDetails.disbursement.forEach(() => {
          this.addDisbursement();
        });
        this.projectForm.patchValue(project)
      }
    });

  }

  addDisbursement(){
    const disbursement = this.fb.group({
      cost: [{value: null , disabled: true}],
      date: [{value: null , disabled: true}]
    });
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }

  get disbursements(){
    return this.projectForm.get('costDetails.disbursement') as FormArray
  } 
  get projectName(){
    return this.projectForm.get('projectName')
  }
  get description(){
    return this.projectForm.get('description')
  }
  get projectType(){
    return this.projectForm.get('projectType')
  }
  get address(){
    return this.projectForm.get('address')
  }
  get dateStarted(){
    return this.projectForm.get('dateStarted')
  }
  get dateEnded(){
    return this.projectForm.get('dateEnded')
  }
  get totalCost(){
    return this.projectForm.get('costDetails.totalCost')
  }
  get costDetails(){
    return this.projectForm.get('costDetails')
  }
}
