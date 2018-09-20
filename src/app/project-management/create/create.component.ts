import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { ValidateDisbursements } from '../disbursements.validator';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
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
    this.projectTypeGenerateIcon = this.projectService.projectTypeGenerateIcon;

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
    // this.isReadOnly = this.projectService.isReadonly
    // this.projectService.selectedProject.subscribe(project => {
    //   if (project.id != null) {
    //     this.isNew = false;
    //     project.disbursement.forEach(() => {
    //       this.addDisbursement();
    //     });
    //     this.disbursementDeleteForm(0)
    //     this.projectForm.patchValue(project)
    //   }
    // });
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
    this.projectForm.value.id = this.generateId();
    const newProject = this.projectForm.value;
    // this.projectService.addProject(newProject);
    this.projectService.addProjectToDB(this.projectForm.value);
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
