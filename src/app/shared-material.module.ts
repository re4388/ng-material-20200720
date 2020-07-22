import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,

    MatDialogModule,
    MatInputModule,

    MatSelectModule,
    MatMenuModule,

    MatGridListModule,

    MatRippleModule,
    MatCheckboxModule,
  ], // 先import
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,

    MatDialogModule,
    MatInputModule,

    MatSelectModule,
    MatMenuModule,

    MatGridListModule,

    MatRippleModule,
    MatCheckboxModule,
  ], // 在export
})
export class SharedMaterialModule {}
