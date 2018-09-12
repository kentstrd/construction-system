import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shared-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss']
})
export class ViewOptionsComponent implements OnInit {
  @Input()
  for;

  constructor() {}

  ngOnInit() {}
}
