import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-shared-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss']
})
export class ViewOptionsComponent implements OnInit {
  @Input()
  for;
  active;

  constructor(private projectServie: ProjectService) {
    this.active = 'grid';
  }

  ngOnInit() {}
}
// [routerLink] = "[active,'create','new']"
