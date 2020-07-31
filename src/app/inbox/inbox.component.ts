import {
  Component,
  OnInit,
  ViewContainerRef,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { MatButton } from '@angular/material/button';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
})
export class InboxComponent implements OnInit {
  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  @ViewChild('overlayMenuList') overlayMenuList: TemplateRef<any>;
  @ViewChild('originFab') originFab: MatButton;
  @ViewChild('originButton') originButton: MatButton;
  overlayRef: OverlayRef;

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

  ngOnInit(): void {
    /* 建立一個 ConnectedPositionStrategy，代表 overlay 要與某個物件連結的策略 */
    const strategy = this.overlay
      .position()
      .global()
      .width('500px')
      .height('100px')
      .centerHorizontally()
      .centerVertically();

    //   .connectedTo(
    //   // 要被連結的物件 (也就是我們的 originFab 這個按鈕)
    //   this.originFab._elementRef,
    //   // 連結物件的連結點位置
    //   { originX: 'end', originY: 'top' },
    //   // 被連結物件時的連結點位置
    //   { overlayX: 'end', overlayY: 'bottom' }
    // );

    const config = new OverlayConfig({
      hasBackdrop: true,
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: strategy,
    });
    this.overlayRef = this.overlay.create(config);
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
  }

  // 在 displayMenu() 方法中，檢查是否有 attach 東西上去，如果有，就執行 detach()，
  // 如果沒有，就把 overlayMenuList 這個 template 轉成 TemplatePortal 並 attach 上去。
  displayMenu(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      this.overlayRef.attach(
        new TemplatePortal(this.overlayMenuList, this.viewContainerRef)
      );
    }
  }
}
