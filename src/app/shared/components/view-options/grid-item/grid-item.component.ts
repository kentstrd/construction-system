import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../../project-management/project.service';
import { EmployeeService } from '../../../../employee/services/employee.service';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {
  @Input()
  item;
  @Input()
  items;
  projectTypeGenerateIcon;
  header;
  icon;
  body_row_1;
  body_row_2a;
  body_row_2b;
  body_row_3;

  constructor(private projectService: ProjectService, private employeeService: EmployeeService) {
    this.projectTypeGenerateIcon = this.projectService.projectTypeGenerateIcon;
  }

  ngOnInit() {
    if (this.items === this.projectService.getProjects()) {
      this.header = this.item.projectName;
      this.icon = this.projectTypeGenerateIcon(this.item.projectType);
      this.body_row_1 = this.item.address.barangay;
      this.body_row_2a = this.item.address.municipality;
      this.body_row_2b = this.item.address.province;
      this.body_row_3 = `${this.item.costDetails.totalCost} budget`;
    } else {
      this.header = this.item.skill;
      this.icon = this.GenerateIconBasedOnGender(this.item.gender);
      this.body_row_1 = this.item.addresses[0].homeaddress;
      this.body_row_2a = this.item.lastName;
      this.body_row_2b = this.item.firstName;
      this.body_row_3 = this.item.contacts[0].homenumber;
    }
  }

  view() {
    if (this.items === this.projectService.getProjects()) {
      this.projectService.setProject(this.item);
    } else {
      this.employeeService.setEmployee(this.item);
    }
  }
  edit() {
    if (this.items === this.projectService.getProjects()) {
      this.projectService.setProject(this.item);
    } else {
      this.employeeService.setEmployee(this.item);
    }
  }

  GenerateIconBasedOnGender(gender) {
    if (gender === 'Female') {
      return `fa fa-female fa-lg`;
    } else {
      return `fa fa-male fa-lg`;
    }
  }
}
