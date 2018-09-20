import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Location } from '@angular/common';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  projectForm: FormGroup;
  projectTypeOptions = ['Building', 'Local Access Road', 'Hospital'];
  patternForPesoValidation = /^[0-9₱,.]*$/;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      id: [''],
      projectName: [{ value: null, disabled: true }],
      description: [{ value: null, disabled: true }],
      projectType: [{ value: null, disabled: true }],
      address: this.fb.group({
        province: [{ value: null, disabled: true }],
        municipality: [{ value: null, disabled: true }],
        barangay: [{ value: null, disabled: true }]
      }),
      dateStarted: [{ value: null, disabled: true }],
      dateEnded: [{ value: null, disabled: true }],
      costDetails: this.fb.group({
        totalCost: [{ value: null, disabled: true }],
        disbursement: this.fb.array([])
      })
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.projectService.projects.forEach(project => {
        project._id === params.id ? this.generateForm(project) : null;
      });
    });
  }
  generateForm(project: Project) {
    project.costDetails.disbursement.forEach(() => this.addDisbursement());
    this.projectForm.patchValue(project);
  }

  addDisbursement() {
    const disbursement = this.fb.group({
      cost: [{ value: null, disabled: true }],
      date: [{ value: null, disabled: true }]
    });
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }

  back() {
    this.location.back();
  }

  get disbursements() {
    return this.projectForm.get('costDetails.disbursement') as FormArray;
  }
  get projectName() {
    return this.projectForm.get('projectName');
  }
  get description() {
    return this.projectForm.get('description');
  }
  get projectType() {
    return this.projectForm.get('projectType');
  }
  get address() {
    return this.projectForm.get('address');
  }
  get dateStarted() {
    return this.projectForm.get('dateStarted');
  }
  get dateEnded() {
    return this.projectForm.get('dateEnded');
  }
  get totalCost() {
    return this.projectForm.get('costDetails.totalCost');
  }
  get costDetails() {
    return this.projectForm.get('costDetails');
  }
  projectTypeGenerateIcon(icon) {
    if (icon === 'Building') {
      return 'fa fa-building fa-lg';
    } else if (icon === 'Local Access Road') {
      return 'fa fa-road fa-lg';
    } else if (icon === 'Hospital') {
      return 'fa fa-hospital-o fa-lg';
    }
  }
}
