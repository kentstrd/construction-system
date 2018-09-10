import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../../project-management/project.service';
import { EmployeeService } from '../../../../employee/services/employee.service';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input()
  item;
  @Input()
  items;
  @Input()
  tableRow;

  constructor(private projectService: ProjectService, private employeeService: EmployeeService) {}

  ngOnInit() {
    if (this.items === this.projectService.getProjects()) {
      this.tableRow = this.getProjectTableData();
    } else {
      this.tableRow = this.getEmployeeTableData();
    }
  }

  getProjectTableData(): string[] {
    return [
      this.item.projectName,
      this.item.projectType,
      `${this.item.address.municipality}, ${this.item.address.province}`,
      this.item.totalCost,
      this.item.dateStarted
    ];
  }

  getEmployeeTableData(): string[] {
    return [
      this.item.skill,
      `${this.item.firstName} ${this.item.lastName}`,
      this.item.gender,
      `${this.item.addresses[0].homeaddress}`,
      this.item.contacts[0].homenumber
    ];
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
}
