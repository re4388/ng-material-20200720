import { Component, ViewChildren, QueryList, ViewContainerRef, ViewChild, TemplateRef, Injector, Inject, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Portal, CdkPortal, TemplatePortal, ComponentPortal, PortalInjector, DomPortalOutlet } from '@angular/cdk/portal';
import {
  Portal4Component,
  PORTAL4_INJECT_DATA,
} from '../portal4/portal4.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cdk-observe-content-demo',
  templateUrl: './cdk-observe-content-demo.component.html',
  styleUrls: ['./cdk-observe-content-demo.component.css'],
})
export class CdkObserveContentDemoComponent {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef
  ) {}

  name = 'Ben Hu';
  domPortalOutlet: DomPortalOutlet;

  @ViewChildren(CdkPortal) templatPortals: QueryList<CdkPortal>;
  @ViewChild('template') template3: TemplateRef<any>;
  currentPortal: Portal<any>;

  count = 0;

  changePortal1(): void {
    this.templatPortals.first.context = { nameInPortal1: this.name };
    this.currentPortal = this.templatPortals.first;
  }

  changePortal2(): void {
    this.currentPortal = this.templatPortals.last;
  }

  changePortal3(): void {
    // 用TemplatePortal 包裝 TemplateRef 和用  ViewChild 引入的 template3
    this.currentPortal = new TemplatePortal(
      this.template3,
      this.viewContainerRef,
      { nameInPortal3: this.name }
    );
  }

  changePortal4(): void {
    const portalInjector = this._createInjector();
    this.currentPortal = new ComponentPortal(
      Portal4Component,
      undefined,
      portalInjector
    );
  }

  private _createInjector(): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(PORTAL4_INJECT_DATA, { nameInObject: this.name });
    return new PortalInjector(this.injector, injectionTokens);
  }

  createOutletOutOfApp(): void {
    const element = this.document.createElement('div');
    element.innerHTML = '<br>我在&ltapp-root&gt;之外';
    this.document.body.appendChild(element);
    this.domPortalOutlet = new DomPortalOutlet(
      element,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  addTemplatePortal(): void {
    this.domPortalOutlet.attachTemplatePortal(this.templatPortals.last);
  }

  projectContentChanged($event: MutationRecord[]): void {
    ++this.count;
    console.log(`資料變更，第${this.count}次`);
    console.log($event, this.count);
    console.log($event);
  }
}
