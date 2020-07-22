import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface Animal {
  name: string;
}

export interface DialogData {
  name: string;
  project: string;
}

interface Food {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-link1',
  templateUrl: './link1.component.html',
  styleUrls: ['./link1.component.css'],
})
export class Link1Component implements OnInit {
  // we inject MatDialog helper to open dialog component
  constructor(public dialog: MatDialog) {}

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  /* select */
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  selectedFood = this.foods[2].value;

  /* From */
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  /* Dialog */
  name: string;
  project: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px',
      data: {
        name: this.name,
        project: this.project,
      },
    });

    // we also can subscribe afterClosed event to do stuff after we close it
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.project = result;
    });
  }

  /* Chip */
  /* MatChip Properties */
  selectable = true;
  removable = true;

  // visible = true;

  /* Input properties */
  addOnBlur = true;
  /* you also can use comma to trigger event */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /* data */
  animal: Animal[] = [{ name: 'Dog' }, { name: 'Cat' }, { name: 'Horse' }];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.animal.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(animal: Animal): void {
    const index = this.animal.indexOf(animal);
    if (index >= 0) {
      this.animal.splice(index, 1);
    }
  }

  ngOnInit(): void {}
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    // we also need to inject dialogRef to reference itself to close it
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    // // we need to use injector with MAT_DIALOG_DATAto inject Data
    // to pass data into dialog component
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
