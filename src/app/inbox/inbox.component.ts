import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {

  tabIndex = 0;
  tabFocusChange($event: MatTabChangeEvent): void {
    console.log(`focus變更，indx：${$event.index}`);
  }

  tabSelectedIndexChange($event: number): void {
    console.log(`selectedIndex變更，index：${$event}`);
  }

  tabSelectedTabChange($event: MatTabChangeEvent): void {
    console.log(`selectedTab變更，index：${$event.index}`);
  }
  constructor() {}

  ngOnInit(): void {

  }
}
