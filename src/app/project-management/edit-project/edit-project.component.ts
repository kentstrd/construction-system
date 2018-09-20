import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  testForm: FormGroup;
  projectForm: FormGroup;
  isNew: boolean = true;
  projectTypeGenerateIcon;
  projectTypeOptions;
  patternForPesoValidation;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public router: Router
  ) {
    this.projectTypeOptions = ['Building', 'Local Access Road', 'Hospital'];
    this.patternForPesoValidation = /^[0-9₱,.]*$/;
    this.projectTypeGenerateIcon = projectService.projectTypeGenerateIcon;

    this.projectForm = projectService.projectForm;
  }

  ngOnInit() {
    this.projectService.selectedProject.subscribe(project => {
      if (project.id != null) {
        project.costDetails.disbursement.forEach(() => {
          this.addDisbursement();
        });
        this.disbursementDeleteForm(1);
        this.projectForm.patchValue(project);
      }
    });
  }

  addDisbursement() {
    const disbursement = this.fb.group({
      cost: ['', [Validators.pattern(/^[0-9₱,.]*$/), Validators.minLength(2), Validators.required]],
      date: ['', Validators.required]
    });
    this.disbursements.push(disbursement);
  }

  disbursementDeleteForm(i) {
    this.disbursements.removeAt(i);
  }

  onSubmit() {
    const newProject = this.projectForm.value;
    this.projectService.updateProject(newProject);
    this.router.navigate(['/project']);
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
}
