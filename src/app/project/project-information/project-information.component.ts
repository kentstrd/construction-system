import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isReadOnly = this.projectService.isReadonly;
    (this.projectForm = this.fb.group({
      id: [''],
      projectName: [''],
      description: [''],
      projectType: [''],
      address: this.fb.group({
        province: [''],
        municipality: [''],
        barangay: ['']
      }),
      dateStarted: [''],
      dateEnded: [''],
      totalCost: [''],
      disbursement: this.fb.array([
        this.fb.group({
          cost: [''],
          date: ['']
        })
      ])
    })),
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

  get disbursements() {
    return this.projectForm.get('disbursement') as FormArray;
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
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
