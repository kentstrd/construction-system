import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Location } from '@angular/common';
import { ValidateDisbursements } from '../disbursements.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-manage-form',
  templateUrl: './manage-form.component.html',
  styleUrls: ['./manage-form.component.scss']
})
export class ManageFormComponent implements OnInit {
  projectForm: FormGroup;
  isNew: boolean = false;
  previousUrl: string;
  projectTypeOptions = ['Building', 'Local Access Road', 'Hospital'];
  patternForPesoValidation = /^[0-9₱,.]*$/;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.projectForm = this.fb.group({
      id: [''],
      projectName: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      projectType: ['', Validators.required],
      address: this.fb.group(
        {
          province: ['', Validators.required],
          municipality: ['', Validators.required],
          barangay: ['', Validators.required]
        },
        Validators.required
      ),
      dateStarted: ['', Validators.required],
      dateEnded: ['', Validators.required],
      costDetails: this.fb.group(
        {
          totalCost: [
            '',
            [
              Validators.pattern(this.patternForPesoValidation),
              Validators.minLength(4),
              Validators.required
            ]
          ],
          disbursement: this.fb.array([
            this.fb.group({
              cost: ['', [Validators.pattern(this.patternForPesoValidation)]],
              date: ['']
            })
          ])
        },
        { validator: ValidateDisbursements }
      )
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      params.id === 'new'
        ? (this.isNew = true)
        : this.projectService.projects.forEach(project => {
            project._id === params.id ? this.generateForm(project) : null;
          });
    });
  }

  generateForm(project: Project) {
    project.costDetails.disbursement.forEach(() => this.addDisbursement());
    this.disbursementDeleteForm(1);
    this.projectForm.patchValue(project);
  }

  addDisbursement() {
    const disbursement = this.fb.group({
      cost: [
        '',
        [
          Validators.pattern(this.patternForPesoValidation),
          Validators.minLength(2),
          Validators.required
        ]
      ],
      date: ['', Validators.required]
    });
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }

  onSubmit() {
    if (this.isNew && this.projectForm.valid) {
      this.projectForm.value.id = this.generateId();
      this.projectService.addProjectToDB(this.projectForm.value);
    } else {
      this.projectService.updateProject(this.projectForm.value);
    }
    this.location.back();
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
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
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
