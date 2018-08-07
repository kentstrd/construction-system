import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
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
  projectForm: FormGroup;
  isNew: boolean = true;
  data:{};
  

  constructor( private fb: FormBuilder, 
               private projectService: ProjectService, 
               public router: Router) { 
    
  }


  ngOnInit() {
    // const formDataObj = {};
    // for (const prop of Object.keys(this.data)){
    //   formDataObj[prop] = new FormControl(this.data[prop])
    //   this.formProps.push(prop)
    // }
    // this.form = new FormGroup(formDataObj)



    this.projectForm = this.fb.group({
      projectProfile: this.fb.group({
        projectName: [''],
        description:[''],
        dateStarted:[''],
        dateEnded:['']
      }),
      projectCost: this.fb.group({
        totalCost:[''],
        disbursement: this.fb.array([]),
      }),
    });
    this.addDisbursement();
    // this.projectForm.valueChanges.subscribe(console.log)
    this.projectService.selectedProject.subscribe(project => {
      if (project.id != null) {
        this.isNew = false;
        this.projectForm.value.projectProfile = project.projectProfile
        this.projectForm.value.projectCost = project.projectCost
      }
    });
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
    const newProject ={
      id: this.generateId(),
      projectProfile: this.projectForm.value.projectProfile,
      projectCost: this.projectForm.value.projectCost
      }
      this.projectService.addProject(newProject);
      this.router.navigate(['/project'])
      // console.log(this.projectService.projects);
    }
    generateId() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }

  




