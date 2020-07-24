import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddPostConfirmDialogComponent } from '../add-post-confirm-dialog/add-post-confirm-dialog.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css'],
})
export class AddPostDialogComponent implements OnInit {
  title: string;
  tags = ['JavaScript', 'Material Design', 'Angular Material'];
  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private dialogRef: MatDialogRef<AddPostDialogComponent>,
    private dialog: MatDialog
  ) {}
  addTag($event: MatChipInputEvent): void {
    if (($event.value || '').trim()) {
      const value = $event.value.trim();
      if (this.tags.indexOf(value) === -1) {
        this.tags.push(value);
      }
    }

    $event.input.value = '';
  }

  doPost(): void {
    this.dialog.open(AddPostConfirmDialogComponent, {
      data: {
        title: this.title,
      },
    });
  }
  removeTag(tagName: string): void {
    this.tags = this.tags.filter((tag) => tag !== tagName);
  }
  move(): void {
    this.dialogRef.updatePosition({
      top: '0',
      left: '0',
    });
  }

  ngOnInit(): void {}
}
