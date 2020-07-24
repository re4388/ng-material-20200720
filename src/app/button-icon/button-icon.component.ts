import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.css'],
})
export class ButtonIconComponent implements OnInit {
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
    1. original font class alias, we set `font awesome`
    2. original icon font class name, it's `fa` */
    this.matIconRegistry.registerFontClassAlias('font-awesome', 'fa');
  }
}
