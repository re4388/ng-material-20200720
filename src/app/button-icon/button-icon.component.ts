import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Directionality, Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.css'],
})
export class ButtonIconComponent implements OnInit {
  displayContent = 0;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private directionality: Directionality
  ) {}

  ngOnInit(): void {
    console.log(`目前dir: ${this.directionality.value}`);
    this.directionality.change.subscribe((dir: Direction) => {
      console.log(`component的dir被改變了: ${dir}`);
    });

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
