import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime} from 'rxjs/operators';
import { PesoPipe } from '../../shared/pipes/peso.pipe';


@Component({
  selector: 'app-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit,OnDestroy {
  projectForm: FormGroup;
  isNew: boolean = true;
  isReadOnly: boolean;
  subscription: Subscription;

  constructor( private fb: FormBuilder, 
               private projectService: ProjectService, 
               public router: Router,
               private peso: PesoPipe) {
          
            }

  ngOnInit() {
    this.isReadOnly = this.projectService.isReadonly
    this.projectForm = this.fb.group({
        id:[''],
        projectName: ['',Validators.required],
        description:[''],        
        projectType:['', Validators.required],
        address:this.fb.group({
          province:['',Validators.required],
          municipality:['',Validators.required],
          barangay:['',Validators.required],
        }),
        dateStarted:[''],
        dateEnded:[''],
        totalCost:['',Validators.required],
        disbursement: this.fb.array([
          this.fb.group({
            cost: [''],
            date: ['']            
          })
        ]),
      }),
              
 this.subscription = this.disbursements.valueChanges.pipe(
          distinctUntilChanged(),
          // debounceTime(800),
          ).subscribe(res =>{
          this.computeDisbursement()
          res.forEach(element => {
              element.cost = this.peso.transform(element.cost)
              this.disbursements.patchValue(res ,{ emitEvent: false })
          });
        })

    this.projectService.selectedProject.subscribe(project => {
      if (project.id != null) {
        this.isNew = false;
        project.disbursement.forEach(() => {
          this.addDisbursement();
        });
        this.disbursementDeleteForm(0)
        this.projectForm.patchValue(project)
      }
    });

  }
  
  addDisbursement(){
    const disbursement = this.fb.group({
      cost: [''],
      date: ['']
    });
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }
  computeDisbursement(){
    let cost = [];
    this.disbursements.value.forEach(element =>{
    cost.push(+element.cost.replace(/[^0-9.]/g,''))
   })
    let sum = cost.reduce((a, b) => a + b, 0)
    let totalCost = this.projectForm.get('totalCost').value
    .replace(/[^0-9.]/g,'')
    if(sum > +totalCost){
      return false
    }else{
      return true
    }
  }

  onSubmit() {
    if (this.isNew) {
      this.projectForm.value.id = this.generateId;
      const newProject = this.projectForm.value;
      this.projectService.addProject(newProject);
    } else {
      const updatedForm = this.projectForm.value;
      this.projectService.updateProject(updatedForm);
    }
    this.router.navigate(['/project'])
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

    get disbursements(){
      return this.projectForm.get('disbursement') as FormArray
    } 
    get projectName(){
      return this.projectForm.get('projectName')
    }
    get projectType(){
      return this.projectForm.get('projectType')
    }
    get province(){
      return this.projectForm.get('address.province')
    }
    get municipality(){
      return this.projectForm.get('address.municipality')    
    }
    get barangay(){
      return this.projectForm.get('address.barangay')    
    }
    get totalCost(){
      return this.projectForm.get('totalCost')
    }
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
