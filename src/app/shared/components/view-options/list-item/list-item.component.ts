import { Component, OnInit, Input, Directive } from '@angular/core';
import { ProjectService } from '../../../../project/project.service';


@Component({
  selector: '[app-list-item]',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
@Input() item
@Input() items
@Input() row

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    if(this.items === this.projectService.getProjects()){
      this.row = this.getProjectTableRow()
    }else{
      this.row = this.getEmployeeTableRow()
    }
  }

  getProjectTableRow(): string[]{
    return [
      this.item.projectName,
      this.item.projectType,
      this.item.address.province,
      this.item.totalCost,
      this.item.dateStarted
    ]
  }

  getEmployeeTableRow(): string[]{
    return [
      this.item.firstName,
      this.item.lastName, 
      this.item.skill,
      this.item.addresses[0].homeaddress,
      this.item.contacts[0].homenumber
    ]
  }

}
