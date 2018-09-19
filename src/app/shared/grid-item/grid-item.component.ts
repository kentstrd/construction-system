import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-grid-item',
  templateUrl: './grid-item.component.html',
  styleUrls: ['./grid-item.component.scss']
})
export class GridItemComponent implements OnInit {
  @Input()
  item;
  @Input()
  for;

  header;
  icon;
  body_row_1;
  body_row_2a;
  body_row_2b;
  body_row_3;

  constructor() {}

  ngOnInit() {
    console.log(this.item);
    if (this.for === 'project') {
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
      this.body_row_2a = this.item.fullname.lastName;
      this.body_row_2b = this.item.fullname.firstName;
      this.body_row_3 = this.item.contacts[0].homenumber;
    }
  }

  GenerateIconBasedOnGender(gender) {
    return `fa ${gender == 'Female' ? 'fa-female' : 'fa-male'} fa-lg`;
  }

  projectTypeGenerateIcon(icon) {
    return `fa ${
      icon == 'Building' ? 'fa-building' : icon == 'Hospital' ? 'fa-hospital-o' : 'fa-road'
    } fa-lg`;
  }
}
