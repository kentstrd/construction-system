import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../../project/project';
import { ProjectService } from '../../../../project/project.service';

@Component({
  selector: 'app-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {
  @Input() item;
  @Input() items;
  projectTypeGenerateIcon
  header;
  icon;
  body_row_1;
  body_row_2a;
  body_row_2b;
  body_row_3;


  constructor(private projectService: ProjectService) { 
    this.projectTypeGenerateIcon = this.projectService.projectTypeGenerateIcon
   }

  ngOnInit() {
    // console.log(this.projectService.getProjects())
    if(this.items === this.projectService.getProjects()){
      this.header = this.item.projectName;
      this.icon = this.projectTypeGenerateIcon(this.item.projectType);
      this.body_row_1 = this.item.address.barangay;
      this.body_row_2a = this.item.address.municipality;
      this.body_row_2b = this.item.address.province;
      this.body_row_3 = `${this.item.totalCost} budget`  
    }else{
      this.header = this.item.skill;
      this.icon = this.GenerateIconBasedOnGender(this.item.gender)
      this.body_row_1 = this.item.address[0].homeaddress;
      this.body_row_2a = this.item.lastName;
      this.body_row_2b = this.item.firstName;
      this.body_row_3 = this.item.contact[0].homenumber;
    }
  }

  GenerateIconBasedOnGender(gender){
    if(gender === 'Female'){
      return `fa fa-female fa-lg`
    }else{
      return `fa fa-male fa-lg`
    }
  }
}
