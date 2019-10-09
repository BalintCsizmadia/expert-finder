import { Component, OnInit, AfterContentInit } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {

  // 2005-06-17T11:06Z
  now = this.dateFormatter(new Date());

  constructor() { }

  ngOnInit() {
  }

  dateFormatter(moment: Date) {
    return new Date(moment).toISOString();
  }

  ngAfterContentInit() {
  }

}
