import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss']
})
export class ProjectInformationComponent implements OnInit {
  projectForm: FormGroup;
  isNew: boolean = true;
  isReadOnly: boolean;
  projectTypeGenerateIcon;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public router: Router
  ) {
    this.projectTypeGenerateIcon = this.projectService.projectTypeGenerateIcon;

    this.projectForm = this.fb.group({
      id: [''],
      projectName: ['', Validators.required],
      description: [''],
      projectType: ['', Validators.required],
      address: this.fb.group({
        province: ['', Validators.required],
        municipality: ['', Validators.required],
        barangay: ['', Validators.required]
      }),
      dateStarted: [''],
      dateEnded: [''],
      totalCost: ['', Validators.required],
      disbursement: this.fb.array([
        this.fb.group({
          cost: [''],
          date: ['']
        })
      ])
    });
  }

  ngOnInit() {
    this.isReadOnly = this.projectService.isReadonly;
    this.projectService.selectedProject.subscribe(project => {
      if (project.id != null) {
        this.isNew = false;
        project.disbursement.forEach(() => {
          this.addDisbursement();
        });
        this.disbursementDeleteForm(0);
        this.projectForm.patchValue(project);
      }
    });
  }

  addDisbursement() {
    const disbursement = this.fb.group({
      cost: [''],
      date: ['']
    });
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }

  getDisbursementCost() {
    let disbursementCost = [];
    this.disbursements.value.forEach(element => {
      disbursementCost.push(+element.cost.replace(/[^0-9.]/g, ''));
    });
    return disbursementCost;
  }
  computeDisbursementCost() {
    let disbursementCost = this.getDisbursementCost();
    let sumOfdisbursementCost = disbursementCost.reduce((a, b) => a + b, 0);
    return sumOfdisbursementCost;
  }

  validateDisbursements() {
    let totalCostOfDisbursements = this.totalCost.value.replace(/[^0-9.]/g, '');
    if (this.computeDisbursementCost() > +totalCostOfDisbursements) {
      return false;
    } else {
      return true;
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
    this.router.navigate(['/project']);
  }

  get disbursements() {
    return this.projectForm.get('disbursement') as FormArray;
  }
  get projectName() {
    return this.projectForm.get('projectName');
  }
  get projectType() {
    return this.projectForm.get('projectType');
  }
  get province() {
    return this.projectForm.get('address.province');
  }
  get municipality() {
    return this.projectForm.get('address.municipality');
  }
  get barangay() {
    return this.projectForm.get('address.barangay');
  }
  get totalCost() {
    return this.projectForm.get('totalCost');
  }
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
