import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  projectForm: FormGroup;
  project: Project;
  selectedProject;
  disbursement;


  constructor(private fb: FormBuilder,
              private projectService: ProjectService,
              public router: Router) { 
      this.disbursement = [];
      this.selectedProject=this.projectService.selected
    }

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectProfile: this.fb.group({
        projectName: [this.selectedProject.projectProfile.projectName],
        description:[this.selectedProject.projectProfile.description],
        dateStarted:[this.selectedProject.projectProfile.dateStarted],
        dateEnded:[this.selectedProject.projectProfile.dateEnded]
      }),
      projectCost: this.fb.group({
        totalCost:[this.selectedProject.projectCost.totalCost],
        disbursement: this.fb.array([]),
      }),
    });
    
    if(this.selectedProject.projectCost.disbursement.length == undefined){
     this.disbursements.push(this.fb.group(this.selectedProject.projectCost.disbursement))
    }else{
      this.selectedProject.projectCost.disbursement.forEach(element => {
        this.disbursements.push(this.fb.group(element))
      });
    };
    
  }

  get disbursements(){
    return this.projectForm.get('projectCost.disbursement') as FormArray
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
    const updatedProject ={
      id: this.selectedProject.id,
      projectProfile: this.projectForm.value.projectProfile,
      projectCost: this.projectForm.value.projectCost
      }
      this.projectService.updateProject(updatedProject)
      this.router.navigate(['/project'])
  }

}
