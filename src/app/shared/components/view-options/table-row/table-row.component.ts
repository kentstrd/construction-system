import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../../project-management/project.service';


@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
@Input() item
@Input() items
@Input() tableRow


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    if(this.items === this.projectService.getProjects()){
      this.tableRow = this.getProjectTableData()
    }else{
      this.tableRow = this.getEmployeeTableData()
    }

  }

  getProjectTableData(): string[]{
    return [
      this.item.projectName,
      this.item.projectType,
      `${this.item.address.municipality}, ${this.item.address.province}`,
      this.item.totalCost,
      this.item.dateStarted
    ]
  }

  getEmployeeTableData(): string[]{
    return [
      this.item.skill,
      `${this.item.firstName} ${this.item.lastName}`, 
      this.item.gender,
      `${this.item.addresses[0].homeaddress}  ${this.item.addresses[1].homeaddress}`,
      this.item.contacts[0].homenumber
    ]
  }

  view(){
    this.projectService.setProject(this.item)
  }
  edit(){
    this.projectService.setProject(this.item)
  }

}
