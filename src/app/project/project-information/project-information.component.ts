import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';


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
        description:[],
        dateStarted:[''],
        dateEnded:['']
      }),
      projectCost: this.fb.group({
        totalCost:[''],
        disbursement: this.fb.array([])
      })
    })
  }

}