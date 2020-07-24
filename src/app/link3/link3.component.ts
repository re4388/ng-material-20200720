import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-link3',
  templateUrl: './link3.component.html',
  styleUrls: ['./link3.component.css'],
})
export class Link3Component implements OnInit, AfterViewInit {
  constructor() {}
  @ViewChild(MatRipple) ripple: MatRipple;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.ripple.launch(0, 0);
  }

  triggerRipple(): void {
    const point1 = this.ripple.launch(0, 0, {
      color: 'pink',
      centered: true,
      persistent: true,
      radius: 50,
    });
    const point2 = this.ripple.launch(0, 0, {
      color: 'yellow',
      centered: true,
      persistent: true,
      radius: 20,
    });

    setTimeout(() => {
      point1.fadeOut();
    }, 500);
  }

  clearRipple(): void {
    this.ripple.fadeOutAll();
  }
}
