

/* basic  */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

/* component  */
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import {
  Link1Component,
  DialogOverviewExampleDialogComponent,
} from './link1/link1.component';
import { Link3Component } from './link3/link3.component';
import { SurveyComponent } from './survey/survey.component';

/* double binding required */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* flex layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* animation */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* cdk */
import { LayoutModule } from '@angular/cdk/layout';

/* all about material */
import { SharedMaterialModule } from './shared-material.module';


/* we need this to make custom icon work */
import { HttpClientModule } from '@angular/common/http';
import { DynamicGridComponent } from './dynamic-grid/dynamic-grid.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { BlogComponent } from './blog/blog.component';
import { AddPostDialogComponent } from './blog/add-post-dialog/add-post-dialog.component';
import { AddPostConfirmDialogComponent } from './blog/add-post-confirm-dialog/add-post-confirm-dialog.component';
import { AfterPostNotifyComponent } from './blog/after-post-notify/after-post-notify.component';
import { InboxComponent } from './inbox/inbox.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    Link1Component,
    SurveyComponent,
    Link3Component,
    DialogOverviewExampleDialogComponent,
    DynamicGridComponent,
    ButtonIconComponent,
    BlogComponent,
    AddPostDialogComponent,
    AddPostConfirmDialogComponent,
    AfterPostNotifyComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    SharedMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddPostDialogComponent, AfterPostNotifyComponent],
})
export class AppModule {}
