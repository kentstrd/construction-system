import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';


@Component({
  selector: 'app-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit() {
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
    this.projectForm.valueChanges.subscribe(console.log)

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
}


