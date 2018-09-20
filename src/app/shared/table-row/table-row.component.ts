import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-shared-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input()
  item;
  @Input()
  for;
  tableRow: string[];

  constructor() {}

  ngOnInit() {
    this.for === 'project'
      ? (this.tableRow = this.getProjectTableData())
      : (this.tableRow = this.getEmployeeTableData());
  }

  getProjectTableData(): string[] {
    return [
      this.item.projectName,
      this.item.projectType,
      `${this.item.address.municipality}, ${this.item.address.province}`,
      this.item.costDetails.totalCost,
      this.item.dateStarted
    ];
  }

  getEmployeeTableData(): string[] {
    return [
      this.item.skill,
      `${this.item.fullname.firstName} ${this.item.fullname.lastName}`,
      this.item.gender,
      this.item.addresses[0].homeaddress,
      this.item.contacts[0].homenumber
    ];
  }
}
