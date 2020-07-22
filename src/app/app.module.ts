
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
import { Link2Component } from './link2/link2.component';
import { Link3Component } from './link3/link3.component';

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


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    Link1Component,
    Link2Component,
    Link3Component,
    DialogOverviewExampleDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    SharedMaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
