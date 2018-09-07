import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-options',
  templateUrl: './view-options.component.html',
  styleUrls: ['./view-options.component.scss']
})
export class ViewOptionsComponent implements OnInit, OnDestroy {
  @Output() activatedURL;
  subscription: Subscription

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
   this.subscription = this.activatedRoute.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      this.activatedURL = url  
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
