import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shared-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {
  @Input()
  subHeaderText;
  @Input()
  icon;

  constructor() {}

  ngOnInit() {
    if (this.subHeaderText === 'project') {
      this.icon = 'fa fa-building-o';
    } else if (this.subHeaderText === 'employee') {
      this.icon = 'fa fa-users';
    }
  }
}
