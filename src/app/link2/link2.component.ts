import { Component, OnInit, ViewChild, AfterViewInit, enableProdMode } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatRipple } from '@angular/material/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-link2',
  templateUrl: './link2.component.html',
  styleUrls: ['./link2.component.css'],
})
export class Link2Component implements OnInit, AfterViewInit {
  @ViewChild(MatRipple) ripple: MatRipple;


  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    /* 3 params:
    namespace：icon's namespace，to categorize icon and avoid name collision
    iconName： icon name
    url：where your secure img source  */
    this.matIconRegistry.addSvgIconInNamespace(
      'custom-svg',
      'universal',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/universal.svg'
      )
    );
    /* 2 params:
    1. original font class alias, we set `fontawesome`
    2. original icon font class name, it's `fa` */
    this.matIconRegistry.registerFontClassAlias('font-awesome', 'fa');
  }

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
